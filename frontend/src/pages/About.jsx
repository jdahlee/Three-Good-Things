import React from "react";

const About = () => {
  return (
    <div className="flex flex-col h-full justify-center items-center p-8 bg-white text-black space-y-6">
      <h1 className="text-3xl font-bold">About Three Good Things</h1>
      <p className="max-w-2xl text-center text-lg">
        <strong>Three Good Things</strong> is a simple and powerful tool to help you build a habit of reflection and gratitude.
        Every week, you list three good things you did or experienced — big or small. Over time, these moments create a
        timeline of positivity you can look back on.
      </p>
      <p className="max-w-2xl text-center text-lg">
        Studies have shown that taking time to reflect on the good in your life can improve your mood, reduce stress,
        and promote mental well-being. Whether it’s a small win, a kind interaction, or a personal breakthrough — 
        they all matter.
      </p>
      <p className="max-w-2xl text-center text-lg">
        This app is your space to track those moments, build a positive streak, and take care of your mental health one week at a time.
      </p>
      <p>
        Creators: Michael, Aafreen, Ashank, Aslan, Ethan, Iggy, Judah, Natalie, Niranjan
      </p>
    </div>
  );
};
export default About;
