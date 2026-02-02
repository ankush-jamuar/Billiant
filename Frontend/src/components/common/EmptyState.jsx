import { FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyState = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  icon: Icon = FileText,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
      {/* Icon */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        <Icon size={24} />
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {primaryAction && (
          <button
            onClick={() => navigate(primaryAction.to)}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            {primaryAction.label}
          </button>
        )}

        {secondaryAction && (
          <button
            onClick={() => navigate(secondaryAction.to)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
