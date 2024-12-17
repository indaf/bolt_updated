import { SiLevelsdotfyi } from "react-icons/si";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";

export const ICON_ACHIEVEMENTS = [
  {
    type: "level",
    icon: <SiLevelsdotfyi />,
  },
  {
    type: "publication",
    icon: <MdOutlinePostAdd />,
  },
  {
    type: "comment",
    icon: <FaCommentDots />,
  },
  {
    type: "friend",
    icon: <FaUserFriends />,
  },
  {
    type: "game",
    icon: <FaGamepad />,
  },
  {
    type: "rank",
    icon: <FaRankingStar />,
  },
];
