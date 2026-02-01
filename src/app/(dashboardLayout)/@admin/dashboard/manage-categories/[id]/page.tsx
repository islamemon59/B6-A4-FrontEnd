import UpdateCategoryForm from "@/components/Admin/UpdateCategoryForm";


type Params = { id: string };

export default async function UpdateCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  return (
    <div className="w-xl mx-auto p-6">
      <UpdateCategoryForm categoryId={id} />
    </div>
  );
}
