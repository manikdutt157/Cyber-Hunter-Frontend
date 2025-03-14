import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaBullseye,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSquareGithub,
} from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TechStack from "../Common/TechStackItem";
import ProfileDiscription from "./ProfileDiscription";

export default function ProfileDash() {
  const user = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [tech, setTech] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const userDetails = useMemo(() => user
    ? {
      name: user.name,
      email: user.email,
      phone: user.phoneNumber,
      Dob: new Date(user.DOB).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      qId: user.qId,
      course: user.course,
      branch: user.branch,
      session: user.session,
      gender: user.gender,
      points: user.points,
    }
    : {}, [user]);

  const userInterests = user?.interest || [];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/project`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setProjects(response.data);

        console.log("Fetched projects:", response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // console.log(user.name);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/user`, user?.userId)
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, user?.userId]);

  // useeffect for document title
  useEffect(() => {
    if (userDetails.name) {
      document.title = `${userDetails.name}'s Profile`;
    }
  }, [userDetails.name]);

  // fetch TechStack
  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        if (projects.length === 0) return;
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/techstack/me/${projects[0]?.userId
          }`
        );
        setTech(response.data);
        console.log("Fetched tech stack:", response.data);
      } catch (error) {
        console.error("Error fetching tech stack:", error);
      }
    };
    fetchTechStack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects[0]?.userId]);

  // Update the fetchUserInterests useEffect
  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        // Fetch user details
        // eslint-disable-next-line no-unused-vars
        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/${user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
      } catch (error) {
        console.error("Error fetching user details:", error.response || error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?._id) {
      fetchUserDetails();
    }
  }, [user?._id]);

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaSquareGithub />,
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
    },
    {
      name: "Twitter",
      icon: <FaTwitterSquare />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="max-h-[calc(100vh-8rem)] p-4 text-stone-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 md:gap-4">
        {/* Left Column - Project Cards */}

        <motion.div
          className="flex flex-col-reverse lg:col-span-4 lg:flex-col space-y-2 gap-4 md:gap-0 no-scrollbar"
          variants={itemVariants}
        >
          <div className="flex flex-col md:space-y-0  bg-gray-800/60 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm">
            <div>
              <h2 className="text-lg font-semibold text-brandPrimary ml-4">Projects</h2>
            </div>
            <motion.div
              className="h-[450px] md:h-[525px] rounded-2xl overflow-y-auto pr-2 mt-6 md:mt-0 no-scrollbar"
              variants={itemVariants}
            >
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <motion.div
                    key={project._id}
                    className="bg-gray-800/60 rounded-xl p-4 shadow-lg mb-4 last:mb-0 hover:bg-gray-700/80 transition-all duration-300"
                  >
                    <div
                      className="flex gap-4 hover:cursor-pointer"
                      onClick={() =>
                        navigate(`/dashboard/project/${project._id}`)
                      }
                    >
                      <div className="w-36 h-40 md:w-32 md:h-32 bg-navy-900 rounded-lg overflow-hidden">
                        <img
                          src={
                            project.projectThumbnail ||
                            "/path/to/default-image.png"
                          }
                          alt={project.projectName}
                          className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                          draggable="false"
                          onError={(e) => {
                            e.target.src = "/path/to/default-image.png";
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-cyan-400 text-lg font-semibold">
                            {project.projectName?.toUpperCase()}
                          </h3>
                          <span className="text-xs text-gray-400">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${project.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : project.status === "approved"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                              }`}
                          >
                            {project.status?.charAt(0).toUpperCase() +
                              project.status?.slice(1)}
                          </span>
                        </div>

                        {/* Project Links */}
                        <div className="flex items-start justify-start gap-4 text-sm text-gray-400 mt-2">
                          {project.gitHubLink && (
                            <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                              <FaGithub className="text-lg" />{" "}
                              {/* Adjusted icon size and removed extra span */}
                              <a
                                href={project.gitHubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                GitHub
                              </a>
                            </div>
                          )}
                          {project.liveLink && (
                            <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                              <FaBullseye />
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Live
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Project Description */}
                        <p className="text-sm text-white mt-2 line-clamp-2">
                          {project.projectDescription}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center h-full text-gray-400"
                  variants={itemVariants}
                >
                  <svg
                    className="w-16 h-16 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <p className="text-lg font-semibold">No Projects Yet</p>
                  <p className="text-sm text-gray-500">
                    Start adding your projects to showcase your work
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Field of Excellence */}
            <h2 className="text-lg font-semibold text-brandPrimary">
              Field of Excellence
            </h2>
          <motion.div
            className="flex w-full bg-gray-800/60 rounded-xl h-[210px] p-4 gap-4 border border-gray-700/50 backdrop-blur-sm "
            variants={itemVariants}
          >
            <div className="overflow-y-auto no-scrollbar">
              <ProfileDiscription />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div className="lg:col-span-8 space-y-4" variants={itemVariants}>

          {/* Badges Section */}
          <motion.div
            className="bg-gray-800/60 rounded-xl px-4 border border-gray-700/50 backdrop-blur-sm"
            variants={itemVariants}
          >
            <h2 className="text-lg font-semibold items-start text-cyan-400 p-2">
              Badges & Achievements
            </h2>
            <div className="flex flex-nowrap justify-start overflow-x-auto gap-2 custom-scrollbar"
              style={{
                paddingBottom: '10px',
              }}
            >

              {["gold", "green", "purple", "silver", "orange", "cyan"].map(
                (color, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-full border-2 ${color === "gold"
                      ? "border-yellow-400 bg-yellow-400/20"
                      : color === "green"
                        ? "border-green-400 bg-green-400/20"
                        : color === "purple"
                          ? "border-purple-500 bg-purple-500/20"
                          : color === "silver"
                            ? "border-gray-400 bg-gray-400/20"
                            : color === "orange"
                              ? "border-orange-400 bg-orange-400/20"
                              : "border-cyan-400 bg-cyan-400/20"
                      } flex items-center justify-center`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-700/50"></div>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Profile and Tech Stack Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Section */}
            <motion.div
              className="bg-gray-800/60 rounded-xl md:p-6 p-4 border border-gray-700/50 backdrop-blur-sm"
              variants={itemVariants}
            >
              <div className="flex flex-col justify-center items-center gap-4 mb-6">
                <div className="w-32 h-32 rounded-full bg-blue-900 flex items-center justify-center">
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                    draggable="false"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{userDetails.name}</h2>
                  <div className="text-cyan-400">{userDetails.points}</div>
                </div>
              </div>

              <div className="space-y-2">
                {Object.entries(userDetails).map(
                  ([key, value]) =>
                    key !== "points" && key !== "name" && (
                      <div
                        key={key}
                        className="grid grid-cols-2 bg-gray-700/30 p-2 rounded-lg overflow-x-hidden md:overflow-x-visible"
                      >
                        <span className="text-gray-400 capitalize">{key}</span>
                        <span className="text-right">
                          {key === "email" ? value.substring(0, 13) + (value.length > 10 ? "..." : "") : value}
                        </span>
                      </div>
                    )
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 mt-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={`#${link.name}`}
                    className=" hover:text-brandPrimary hover:scale-110  text-2xl bg-white/10 rounded-full p-2 hover:bg-white/20 duration-500 transition ease-in"
                  >
                    <span>{link.icon}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="max-h-[700px] overflow-y-auto no-scrollbar rounded-xl bg-gray-800/60 border border-gray-700/50 backdrop-blur-lg"
              variants={itemVariants}
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
                </div>
              ) : tech && tech.length > 0 ? (
                <motion.div
                  className="flex items-center gap-8"
                  variants={containerVariants}
                >
                  <TechStack techstack={tech} />
                </motion.div>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center h-[200px] "
                  variants={itemVariants}
                >
                  <svg
                    className="w-12 h-12 text-gray-500 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                  <p className="text-gray-400 text-center mb-2">
                    No technologies found
                  </p>
                  <p className="text-gray-500 text-sm text-center">
                    Add some technologies to showcase your skills
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Categories (Interests) */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6 mb-8 p-8"
        variants={itemVariants}
      >
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          </div>
        ) : userInterests.length > 0 ? ( // Changed from user?.interestId to userInterests
          userInterests.map((interestId) => (
            <motion.button
              key={interestId}
              className="bg-brandPrimary/20 hover:bg-brandPrimary/30 text-cyan-400 rounded-lg py-2 px-4 transition-colors border border-brandPrimary/30 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              # {interestId}
            </motion.button>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <p className="text-lg font-semibold">No interests found</p>
            <p className="text-sm text-gray-500">
              Add some interests to showcase your preferences
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
