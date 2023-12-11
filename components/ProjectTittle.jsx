import { Input } from "./ui/input";

function ProjectTittle({songName, handleSongNameChange}) {
    return (
        <Input
        className="text-center lg:w-96 w-72 h-6 dark:bg-zinc-800 bg-transparent "
        type="text"
        placeholder="Write the Song Name"
        value={songName}
        onChange={handleSongNameChange}
      />
    );
}

export default ProjectTittle;