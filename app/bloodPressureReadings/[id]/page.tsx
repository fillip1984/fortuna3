"use client";

import { deleteBloodPressureReading } from "@/app/api/(client)/BloodPressureReadingApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowLeft, HiPlus, HiOutlineTrash } from "react-icons/hi2";

export default function BloodPressureReadingPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteBloodPressureReading(params.id);
    router.refresh();
    router.push("/");
  };

  return (
    <div>
      page for bpr {params.id}
      <div className="fixed bottom-16 left-0 right-0 flex justify-between p-4">
        <Link
          href="/"
          className="flex items-center gap-1 rounded border-2 border-black px-4 py-2 text-xl">
          <HiArrowLeft />
          Back
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-1 rounded border-2 border-red-600 px-4 py-2 text-2xl text-red-600">
          Delete
          <HiOutlineTrash />
        </button>
        <button
          type="submit"
          className="flex items-center gap-1 rounded bg-red-600 px-4 py-2 text-2xl text-white">
          Save
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
