import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchKandangData = async () => {
  const res = await fetch("/api/kandang");
  if (!res.ok) {
    throw new Error("Failed to fetch Kandang data");
  }
  return res.json();
};

const postKandangData = async (formData) => {
  const res = await fetch("/api/kandang", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
};

export function useKandangData() {
  const queryClient = useQueryClient();

  const { data: kandangData, error, isLoading } = useQuery("kandangData", fetchKandangData);

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("nama_kandang", data.nama_kandang);

    try {
      await postKandangData(formData);

      // Invalidate and refetch data using React Query
      queryClient.invalidateQueries("kandangData");
    } catch (e) {
      // Handle errors here
      console.error(e);
    }
  };

  return {
    kandangData,
    error,
    isLoading,
    handleSubmit,
  };
}
