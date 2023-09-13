import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function About() {
  return (
    <>
      <h2>A few words about me</h2>
      <p className="mt-4 text-xl leading-loose">
        I am a 21-year old student from Germany studying my{" "}
        <strong>BSc. Data Science</strong> at{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://itu.dk" target="_blank">
              ITU
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-x-1 text-sm">
              IT Universitet København
            </p>
          </TooltipContent>
        </Tooltip>
        . Artificial intelligence is my primary passion within the data science
        field. I am deeply fascinated by the theory and application of machines
        that learn and am convinced that it is going to shape our future in ways
        we cannot imagine yet. In pursuit of learning within this field, I am
        writing my bachelor thesis in computer vision this spring. I am the
        founder of the artificial intelligence student organisation{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://aitu.group" target="_blank">
              AITU
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-x-1 text-sm">
              Artificial Intelligence Community at ITU
            </p>
          </TooltipContent>
        </Tooltip>
        , where we create a community around the field of AI. Moreover, I
        organise the event{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <a href="https://coffeetalks.itu.dk" target="_blank">
              Coffee Talks
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p className="flex items-center gap-x-1 text-sm">
              Research-focused talk series at ITU
            </p>
          </TooltipContent>
        </Tooltip>
        and represent my university as a student ambassador.
        <br />
        Apart from my studies, I work as a teaching assistant at ITU, helping
        course managers to facilitate lectures and exercise sessions.
      </p>
    </>
  );
}
