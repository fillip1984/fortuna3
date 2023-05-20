"use client";

import { createOrUpdateWeightGoal } from "@/app/api/(client)/GoalApi";
import { Goal } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoTrophySharp } from "react-icons/io5";

async function getGoal() {
  const result = await fetch("/api/weighIns/goal");
  return (await result.json()) as Goal;
}

export default async function Goal() {
  const goal = await getGoal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Goal>();

  const goalOnSubmit: SubmitHandler<Goal> = (goalFormData) => {
    createOrUpdateWeightGoal(goalFormData);
  };

  return (
    <form
      onSubmit={handleSubmit(goalOnSubmit)}
      className="my-12 rounded border-2 border-slate-400 px-4 py-2">
      <input type="hidden" {...register("id")} defaultValue={goal?.id} />
      <h4>Goal</h4>
      <p className="text-sm">Set a goal</p>
      <div className="">
        <label className="relative block text-gray-400 focus-within:text-gray-600">
          <IoTrophySharp className="pointer-events-none absolute left-3 top-1/2 h-8 w-8 -translate-y-1/2 transform" />
          <input
            type="number"
            inputMode="decimal"
            placeholder="175"
            className="form-input block w-full appearance-none rounded border border-gray-900 bg-white px-4 py-3 pl-14 text-black placeholder-gray-400 focus:outline-none"
            {...register("weight", { valueAsNumber: true })}
            defaultValue={goal?.weight?.toNumber()}
          />
        </label>
        {errors.weight && (
          <span className="block text-red-300">{errors.weight.message}</span>
        )}
        <button type="submit" className="mt-2 bg-red-500 px-2 py-1">
          Update
        </button>
      </div>
    </form>
  );
}
