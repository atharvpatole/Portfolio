"use client";

import React from "react";
import { skills } from "@/data"; // Importing skills data from index.tsx

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <h1 className="heading">
        My <span className="text-purple">Technical Skills</span>
      </h1>

      {/* Glowing Cards Section */}
      <div className="flex flex-col gap-8 mt-10">
        {/* Frontend Skills */}
        <SkillCategory title="Frontend Technologies" items={skills.frontend} />

        {/* Backend Skills */}
        <SkillCategory title="Backend Technologies" items={skills.backend} />

        {/* Databases */}
        <SkillCategory title="Databases" items={skills.database} />

        {/* Management Tools */}
        <SkillCategory title="Cloud Computing" items={skills.cloudcomputing} />
      </div>
    </section>
  );
};

// Skill Category Component
const SkillCategory = ({ title, items }: { title: string; items: { name: string; img: string }[] }) => {
  return (
    <div className="flex flex-col items-center"> {/* Center align content */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
        {title}
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {items.map((item) => (
          <GlowingCard key={item.name} name={item.name} img={item.img} />
        ))}
      </div>
    </div>
  );
};

// Glowing Card Component
const GlowingCard = ({ name, img }: { name: string; img: string }) => {
  return (
    <div className="relative p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-purple opacity-10 rounded-xl blur-lg"></div>
      <div className="relative flex flex-col items-center">
        <img src={img} alt={name} className="w-12 h-12 md:w-16 md:h-16" />
        <p className="text-white font-medium mt-2">{name}</p>
      </div>
    </div>
  );
};

export default Skills;
