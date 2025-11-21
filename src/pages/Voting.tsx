import { useState } from "react";
import VotingField from "./VotingField";
import BestPlayer from "./BestPlayer";

const Voting = () => {
  const [step, setStep] = useState<"field" | "best">("field");
  const [selections, setSelections] = useState<Record<string, string>>({});

  const handleFieldComplete = (fieldSelections: Record<string, string>) => {
    setSelections(fieldSelections);
    setStep("best");
  };

  if (step === "field") {
    return <VotingField onComplete={handleFieldComplete} />;
  }

  return <BestPlayer selections={selections} />;
};

export default Voting;
