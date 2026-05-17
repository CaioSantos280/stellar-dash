import Universe from "../components/space/Universe";

export default function Space() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
      <Universe />
    </div>
  );
}