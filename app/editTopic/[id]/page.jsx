import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch topic for ID: ${id}. Status: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching topic:", error);
    throw error; // Re-throw the error to propagate it up the call stack
  }
};

export default async function EditTopic({ params }) {
  try {
    const { id } = params;
    const { title, description } = await getTopicById(id) || {};

    return <EditTopicForm id={id} title={title} description={description} />;
  } catch (error) {
    // Handle errors gracefully, e.g., display an error message or redirect
    console.error("Error in EditTopic:", error);
    // Example: return an error message
    return <div>Error: Failed to load topic. Please try again.</div>;
  }
}
