import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaTags, FaCode } from "react-icons/fa";
import ImageSlider from "../components/Project/ImageSlider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';
import Preloader from "../components/Common/Preloader";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectUser, setProjectUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatCreatedAt = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy, hh:mm a');
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    document.title = project?.projectName || "Project";
    const fetchProjectAndUser = async () => {
      document.title = project?.projectName || "Project";
      try {
        const projectRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/project/${id}`
        );
        setProject(projectRes.data.project);
        setProjectUser(projectRes.data.userDetail);
        console.log(projectRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchProjectAndUser();
  }, [id]);

  if (!project) {
    return <Preloader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gradient-to-br to-gray-800 min-h-screen"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <img
            src={project.projectThumbnail}
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            alt={project.projectName}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden"
        >
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="relative z-10">
            <motion.h3
              className="text-4xl font-bold text-cyan-400 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {project.projectName.toUpperCase()}
            </motion.h3>

            <div className="flex items-center gap-4 mb-4">
              <FaTags className="text-cyan-400" />
              <p className="text-gray-300">
                Points: <span className="text-green-500 font-semibold text-xl">{project.point}</span>
              </p>
            </div>

            <div className="flex gap-4 mb-4">
              {project.gitHubLink && (
                <motion.a
                  href={project.gitHubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-xl" />
                  GitHub
                </motion.a>
              )}

              {project.liveLink && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="text-xl text-red-500" />
                  Live
                </motion.a>
              )}
            </div>
              <div>
                <motion.p
                  className="text-gray-300 text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  Created at : {formatCreatedAt(project.createdAt)}
                </motion.p>
              </div>

            {projectUser && (
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 mt-4 flex items-center gap-4"
              >
                <img
                  src={projectUser.profilePicture || "default-profile-picture-url"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                  alt={projectUser.name}
                  draggable={false}
                />
                <div>
                  <h4 className="text-xl font-semibold text-cyan-400">{projectUser.name}</h4>
                  <p className="text-gray-300 text-sm">{projectUser.username}</p>
                  <p className="text-gray-400 text-xs">
                    {`${projectUser.course} ${projectUser.branch} ${projectUser.session}`}
                  </p>
                  <p className="text-gray-400 text-xs">{projectUser.qId}</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaCode className="text-cyan-400" />
            <h4 className="text-xl font-semibold text-cyan-400">Project Description</h4>
          </div>
          <p className="text-gray-300">{project.projectDescription}</p>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <FaTags className="text-cyan-400" />
            <h4 className="text-xl font-semibold text-cyan-400">Tech Stack</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech, index) => (
              <motion.div
                key={tech._id || index}
                className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech.content}
              </motion.div>
            ))}
            {project.language?.map((lang, index) => (
              <motion.div
                key={`lang-${index}`}
                className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                #{lang.content}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Project Screenshots</h2>
        <ImageSlider images={project.projectImage || []} />
      </motion.div>
    </motion.div>
  );
}