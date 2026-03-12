import { Collapsible, Icon, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdInfoOutline } from "react-icons/md";
import BlackoutExample1 from "../../../assets/blackout1.png";
import BlackoutExample2 from "../../../assets/blackout2.png";
import CheatIcon from "../../../assets/cheat-icon.png";
import { useContext } from "react";
import { DataContext } from "../../../App";
import FullPageTemplate from "../../../components/shared/pages/fullScrollPage";

const ArtistInstructions = () => {
  const navigate = useNavigate();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Component must be used within a DataContext.Provider");
  }

  const { userData, addRoleSpecificData } = context;
  const condition = userData?.data.condition;

  const handleSubmit = () => {
    addRoleSpecificData({
      timeStamps: [...(userData?.data?.timeStamps ?? []), new Date()],
    });
    navigate("/artist/brainstorm");
  };

  return (
    <FullPageTemplate
      title="Your Task"
      background="bg2"
      nextButton={{ text: "Begin step 1", action: handleSubmit }}
    >
      <div className="w-full h-full flex-col space-y-6">
        <div className="text-main mb-2">
          In this study, you will be introduced to blackout poetry, and be asked
          to create your own poem. We are focusing here on the process of
          writing rather than the result, so be sure to take time to understand
          and explore the source material, as well as your own holistic
          approach. Don’t worry if you don’t have much experience with blackout
          poetry, we will guide you through the exercise. The most important
          thing is to be curious about what you can create!
          <Collapsible.Root unmountOnExit>
            <Collapsible.Trigger className="text-main underline italic text-light-grey-1 pt-2">
              <div className="flex flex-row items-center space-x-2">
                <Icon className="w-4 h-4 fill-light-grey-1">
                  <MdInfoOutline />
                </Icon>
                <p>Click here for more information on blackout poetry</p>
              </div>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <div className="w-full h-max p-4 mt-3 border rounded-lg border-light-grey-2">
                <p className="text-main">
                  <strong className="italic">Blackout poetry</strong> involves{" "}
                  <strong>blacking out words</strong> from an existing piece of
                  text <strong>to create a new poem</strong>.
                </p>
                <p className="text-main pt-1">
                  Here are two examples of blackout poetry made using the same
                  piece of text:{" "}
                </p>
                <div className="w-full h-max flex flex-col md:flex-row">
                  <Image
                    alt="Blackout Example 1"
                    src={BlackoutExample1}
                    className="w-64"
                  />
                  <Image
                    alt="Blackout Example 2"
                    src={BlackoutExample2}
                    className="w-64"
                  />
                </div>
              </div>
            </Collapsible.Content>
          </Collapsible.Root>
        </div>
        <div>
          <p className="text-main mb-2">The task involves two steps:</p>
          <ul className="list-decimal mb-4 pl-6 space-y-4">
            <li className="text-main">
              <strong>Familiarize yourself with the text (1-3 minutes)</strong>
              <p className="text-main">
                You’ll be given a piece of text to read. Don’t think about how
                this might become a poem just yet. This is just your time to get
                to know the text, think about it, and let ideas start forming.
                {(condition === "SPARK" || condition === "TOTAL_ACCESS") &&
                  " Your blackout poetry partner is here to help you dive deeper into the text or further explain how to create a blackout poem. Try asking it about possible themes within the text, or which words might be connected to these themes."}
              </p>
            </li>
            <li className="text-main">
              <strong>Write your poem (3-5 minutes)</strong>
              <p className="text-main">
                You will make your blackout poem by selecting words from the
                text
                {(condition === "CONTROL" || condition === "SPARK") && "."}{" "}
                {(condition === "SPARK" || condition === "TOTAL_ACCESS") &&
                  "with the guidance of a blackout poetry assistant."}
              </p>
            </li>
          </ul>
          <div className="w-full h-max p-4 mt-4 border rounded-lg border-light-grey-2 flex items-center gap-4">
            <Image alt="Cheat icon" src={CheatIcon} className="w-12" />
            <p className="text-main mb-0">
              Important: please do not take screenshots, copy text, or consult
              external tools such as ChatGPT. We're interested in your best
              effort and what you learn! In addition, do not refresh or use the
              browser's back/forward buttons as you will not be able to continue
              the task.
            </p>
          </div>
        </div>
      </div>
    </FullPageTemplate>
  );
};

export default ArtistInstructions;
