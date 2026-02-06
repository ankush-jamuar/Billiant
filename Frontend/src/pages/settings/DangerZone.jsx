import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import DeleteAccountModal from "../../components/settings/DeleteAccountModal";
import { deleteAccount } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

const DangerZone = () => {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = async (password) => {
  try {
    await deleteAccount(password);

    toast.success("Account deleted permanently");
    localStorage.clear();

    setTimeout(() => {
      navigate("/register");
    }, 1200);

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to delete account"
    );
    throw err; // important so modal loading resets properly
  }
};


  return (
    <>
      <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Danger zone
        </h2>

        <p className="mt-1 text-sm text-red-600">
          Permanently delete your account and all data
        </p>

        <div className="mt-6">
          <Button
            onClick={() => setOpenDelete(true)}
            className="bg-red-600 hover:bg-red-700"
            type="button"
          >
            Delete account permanently
          </Button>
        </div>
      </section>

      <DeleteAccountModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DangerZone;
