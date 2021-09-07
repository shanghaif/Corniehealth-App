import { cornieClient } from "@/plugins/http";
import { boolean } from "yup/lib/locale";

export async function fetchPatients() {
  try {
    const response = await cornieClient().get("/api/v1/patient");
    return response.data;
  } catch (error) {
    window.notify({ msg: "Failed to get patients", status: "error" });
  }
  return [];
}

export async function deletePatient(id: string): Promise<boolean> {
  try {
    const response = await cornieClient().post(
      `/api/v1/patient/dissociate/${id}`,
      {}
    );
    return response.success;
  } catch (error) {
    return false;
  }
}

export async function deleteProvider(id: string): Promise<boolean> {
  try {
    const response = await cornieClient().delete(
      `/api/v1/patient/provider/${id}`
    );
    return response.success;
  } catch (error) {
    return false;
  }
}