import { Input } from "./ui/input.jsx";

const FilterTrackers = ({ onTextChange }) => {
  const handleChange = (e) => {
    onTextChange(e.target.value);
  };
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-4xl font-bold dark:text-white py-5">
        Recherche de Trackers
      </h2>
      <div className="grid grid-cols-6 gap-4">
        <Input
          className="col-start-2 col-span-4"
          type="text"
          placeholder="libéllé du tracker..."
          onChange={handleChange}
        ></Input>
      </div>
    </div>
  );
};

export { FilterTrackers };
