import { ChangeEvent, FormEvent, useState } from "react";
import Swal from "sweetalert2";

export default function useCreateCommonArea() {
  const [error, setError] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [schedule, setSchedule] = useState<
    { day: number; startHour: string; endHour: string; isChecked: boolean }[]
  >([
    { day: 1, startHour: "", endHour: "", isChecked: false },
    { day: 2, startHour: "", endHour: "", isChecked: false },
    { day: 3, startHour: "", endHour: "", isChecked: false },
    { day: 4, startHour: "", endHour: "", isChecked: false },
    { day: 5, startHour: "", endHour: "", isChecked: false },
    { day: 6, startHour: "", endHour: "", isChecked: false },
    { day: 7, startHour: "", endHour: "", isChecked: false },
  ]);
  const [policy, setPolicy] = useState<string>("");
  const [policies, setPolicies] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCapacity(parseInt(e.target.value));
  };

  const handleStartHourChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index].startHour = e.target.value;
    setSchedule(newSchedule);
  };

  const handleEndHourChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index].endHour = e.target.value;
    setSchedule(newSchedule);
  };

  const handleCheckboxChange = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isChecked = !newSchedule[index].isChecked;
    setSchedule(newSchedule);
  };

  const handlePolicyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPolicy(e.target.value);
  };

  const handleAddPolicy = () => {
    if (policy.trim() !== "") {
      setPolicies([...policies, policy]);
      setPolicy("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedSchedule = schedule.filter((horario) => horario.isChecked);
    const scheduleForm = selectedSchedule.map((horario) => ({
      day: horario.day,
      startHour: horario.startHour,
      endHour: horario.endHour,
    }));
    const formData = {
      name: name,
      description: description,
      capacity: capacity,
      schedule: scheduleForm,
      policies: policies,
    };
    const URL = "http://localhost:8000/api/areas-comunes";
    try {
      setError("");
      setErrors([]);
      setSubmitting(true);
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        throw await response.json();
      }

      setName("");
      setDescription("");
      setCapacity(0);
      setSchedule(
        schedule.map((horario) => ({
          ...horario,
          startHour: "",
          endHour: "",
          isChecked: false,
        }))
      );
      setPolicy("");
      setPolicies([]);

      Swal.fire({
        title: "Área común registrada",
        text: "Área común registrada exitosamente",
        icon: "success",
      });
    } catch (error: any) {
      const { message, errors } = error;
      if (errors) {
        setErrors(errors);
      }
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    error,
    errors,
    name,
    description,
    capacity,
    horarios: schedule,
    policy,
    policies,
    submitting,
    setName: handleNameChange,
    setDescription: handleDescriptionChange,
    setCapacity: handleCapacityChange,
    setStartHour: handleStartHourChange,
    setEndHour: handleEndHourChange,
    setCheckbox: handleCheckboxChange,
    setPolicy: handlePolicyChange,
    addPolicy: handleAddPolicy,
    handleSubmit,
  };
}
