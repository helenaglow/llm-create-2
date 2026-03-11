import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import MultiPageTemplate from "../../../components/shared/pages/multiPage";
import { ArtistCondition } from "../../../types";
import { Stage } from "../../../types";
import type { Message, Poem } from "../../../types";
import { useContext } from "react";
import { DataContext } from "../../../App";
import type { Passage } from "../../../types";
import { Passages } from "../../../consts/passages";
const ArtistStep1 = () => {
  const navigate = useNavigate();

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Component must be used within a DataContext.Provider");
  }
  const { userData, addRoleSpecificData } = context;

  const sparkMessagesRef = useRef<Message[]>([]);
  const sparkNotesRef = useRef<string>("");

  const randomIndex = Math.floor(Math.random() * (Passages?.length || 1));
  const selected = Passages?.[randomIndex] ?? "";
  const [passage] = useState<Passage>(selected);
  const userType = userData?.data.condition as ArtistCondition;
  const [sparkMessages, setSparkMessages] = useState<Message[]>([]);
  const [sparkNotes, setSparkNotes] = useState<string>("");

  let artistPoem: Poem = {
    passageId: passage.id,
    passage: passage,
    text: [],
    poemSnapshot: [],
    sparkConversation: [],
    writeConversation: [],
    sparkNotes: "",
    writeNotes: "",
  };

  const onComplete = useCallback(() => {
    artistPoem.sparkConversation = sparkMessagesRef.current;
    artistPoem.sparkNotes = sparkNotesRef.current;
    addRoleSpecificData({
      poem: artistPoem,
      timeStamps: [...(userData?.data?.timeStamps ?? []), new Date()],
    });
    navigate("/artist/blackout");
  }, []);

  useEffect(() => {
    sparkMessagesRef.current = sparkMessages;
    sparkNotesRef.current = sparkNotes;
  }, [sparkMessages, sparkNotes]);
  const words = passage.text.split(" ");

  /**
   * a note about the timers - `autoRedirectDuration` starts running after `duration` finishes, meaning that
   * in this case, the users must complete 1 minute of brainstorming and then have 2 minutes before they are
   * auto-redirected. so the users have a total alloted time of 1-3 minutes to do brainstorming
   */
  return (
    <MultiPageTemplate
      title="Step 1: Familiarize yourself with the text"
      description="This is your time to familiarize yourself with the text and brainstorm for your poem. What is the passage about? What  themes appear? Do any words or ideas stand out? Feel free to take any notes in the text box below. Your notes will be accessible during the writing portion."
      duration={60}
      autoRedirectDuration={240}
      afterDuration={onComplete}
      buttonText="Begin Writing"
      llmAccess={userType == "TOTAL_ACCESS" || userType == "SPARK"}
      stage={Stage.SPARK}
      passage={passage.text}
      messages={sparkMessages}
      setMessages={setSparkMessages}
      notes={sparkNotes}
      setNotes={setSparkNotes}
    >
      <div className="w-full h-full flex">
        <div className=" flex flex-wrap select-none w-[355px] min-w-[355px] md:min-w-[400ox] md:w-[400px] h-max ">
          {words.map((word, i) => {
            return (
              <span
                key={i}
                className={`text-main tracking-[0] antialiased [font-optical-sizing:none] [font-variation-settings:'opsz'_0] [text-rendering:geometricPrecision] cursor-pointer transition duration-200`}
              >
                {word + "\u00A0"}
              </span>
            );
          })}

          <p className="text-xs text-grey text-left pt-2">
            <span className="italic">{'"' + passage.title + '"'}</span>
            <span>{", " + passage.author + " from The New York Times"}</span>
          </p>
        </div>
      </div>
    </MultiPageTemplate>
  );
};

export default ArtistStep1;
