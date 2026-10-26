/* Quantara X Summit — Razorpay ticket checkout */
(function () {
    "use strict";

    function notify(msg) {
        var box = document.getElementById("checkout-message");
        if (box) {
            box.textContent = msg;
            box.style.display = "block";
        } else {
            alert(msg);
        }
    }

    document.addEventListener("click", function (e) {
        var btn = e.target.closest(".buy-pass-btn");
        if (!btn) return;
        e.preventDefault();
        if (btn.classList.contains("is-loading")) return;

        var passId = btn.getAttribute("data-pass");
        btn.classList.add("is-loading");
        var original = btn.innerHTML;
        btn.innerHTML = "Processing…";

        fetch("/api/payment/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pass_id: passId })
        })
            .then(function (r) {
                return r.json().then(function (d) {
                    if (!r.ok) throw new Error(d.detail || "Could not start checkout");
                    return d;
                });
            })
            .then(function (order) {
                btn.classList.remove("is-loading");
                btn.innerHTML = original;
                var options = {
                    key: order.key_id,
                    amount: order.amount,
                    currency: order.currency,
                    name: "Quantara X Summit",
                    description: order.pass_name + " — August 10, 2027 · Marina Bay Sands, Singapore",
                    order_id: order.order_id,
                    theme: { color: "#2E90FF" },
                    handler: function (resp) {
                        fetch("/api/payment/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: resp.razorpay_order_id,
                                razorpay_payment_id: resp.razorpay_payment_id,
                                razorpay_signature: resp.razorpay_signature
                            })
                        })
                            .then(function (r) {
                                return r.json().then(function (d) {
                                    if (!r.ok) throw new Error(d.detail || "Verification failed");
                                    return d;
                                });
                            })
                            .then(function (v) {
                                window.location.href =
                                    "thank-you.html?payment_id=" + encodeURIComponent(v.payment_id);
                            })
                            .catch(function (err) {
                                notify(err.message || "Payment verification failed. Please contact support.");
                            });
                    }
                };
                var rzp = new Razorpay(options);
                rzp.on("payment.failed", function () {
                    notify("Payment failed or was cancelled. No money was charged.");
                });
                rzp.open();
            })
            .catch(function (err) {
                btn.classList.remove("is-loading");
                btn.innerHTML = original;
                notify(err.message || "Something went wrong. Please try again.");
            });
    });
})();
