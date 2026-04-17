import "./style/tab.scss";
import { CgHome } from "react-icons/cg";
import { BiPlusCircle, BiUserCheck } from "react-icons/bi";
import { MdPendingActions } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { RxAvatar } from "react-icons/rx";

export default function Tabbar({ uId, urlRole, urlToken }) {
  const { roles } = useAuth();

  const buttons = [
    {
      id: 1,
      icon: <CgHome />,
      link: `/dashboard?id=${uId}&role=${urlRole}&token=${urlToken}`,
      role: ["admin", "manager"],
    },
    {
      id: 2,
      icon: <BiPlusCircle />,
      link: `/dashboard/create?id=${uId}&role=${urlRole}&token=${urlToken}`,
      role: ["admin"],
    },

    {
      id: 3,
      icon: <BiUserCheck />,
      link: `/dashboard/users?id=${uId}&role=${urlRole}&token=${urlToken}`,
      role: ["admin", "manager"],
    },
    {
      id: 4,
      icon: <MdPendingActions />,
      link: `/dashboard/pending?id=${uId}&role=${urlRole}&token=${urlToken}`,
      role: ["admin", "manager"],
    },
    {
      id: 5,
      icon: <RxAvatar />,
      link: `/dashboard/profile?id=${uId}&role=${urlRole}&token=${urlToken}`,
      role: ["admin", "manager", "user"],
    },
  ];

  const navigate = useNavigate();

  const visibleButton = buttons.filter((btn) => btn.role.includes(roles));

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="tab-main">
      <div className="tab-container">
        {visibleButton.map((item, index) => (
          <div className="button" key={index}>
            <button onClick={() => handleNavigate(item.link)}>
              {item.icon}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
