import { X, Check } from "lucide-react";
import { useEffect } from "react";
import Button from "../ui/Button";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    description: "For getting started",
    features: [
      "Up to 5 invoices",
      "Basic client management",
      "PDF export",
    ],
    cta: "Current plan",
    disabled: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹499 / month",
    description: "Perfect for freelancers",
    popular: true,
    features: [
      "Unlimited invoices",
      "Client & payment tracking",
      "Invoice status automation",
      "Email invoice sending",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
  },
  {
    id: "business",
    name: "Business",
    price: "₹999 / month",
    description: "For growing teams",
    features: [
      "Everything in Pro",
      "Team access",
      "Advanced analytics",
      "Custom branding",
    ],
    cta: "Upgrade to Business",
  },
];

const PlansOverlay = ({ onClose }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop (click to close) */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-5xl rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Upgrade your workspace 🚀
          </h2>
          <p className="mt-2 text-slate-600">
            Choose a plan that fits your business growth
          </p>
        </div>

        {/* Plans */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative rounded-2xl border p-6
                ${
                  plan.popular
                    ? "border-indigo-600 ring-2 ring-indigo-600/20"
                    : "border-slate-200"
                }
              `}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-slate-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {plan.description}
              </p>

              <div className="mt-4 text-3xl font-bold text-slate-900">
                {plan.price}
              </div>

              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 text-indigo-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                disabled={plan.disabled}
                className={`
                  mt-10 w-full py-2.5
                  ${
                    plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }
                  ${plan.disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-slate-500">
          🔒 Secure payments • Cancel anytime • No hidden charges
        </p>
      </div>
    </div>
  );
};

export default PlansOverlay;
