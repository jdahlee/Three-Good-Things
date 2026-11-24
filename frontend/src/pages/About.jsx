import { styles } from "../styles.js";
const About = () => {
  return (
    <div className={`${styles.body} space-y-6`}>
      <h1 className={`${styles.h1}`}>About Three Good Things</h1>
      <p className={`${styles.paragraph}`}>
        <strong>Three Good Things</strong> is a simple and powerful tool to help you build a habit of reflection and gratitude. 
        Every week, you list three good things you did or experienced — big or small. Over time, these moments create a 
        timeline of positivity you can look back on.
      </p>
      <p className={`${styles.paragraph}`}>
        Studies have shown that taking time to reflect on the good in your life can improve your mood, reduce stress, 
        and promote mental well-being. Whether it’s a small win, a kind interaction, or a personal breakthrough
        — they all matter.
      </p>
      <p className={`${styles.paragraph}`}>
        This app is your space to track those moments, build a positive streak, and take care of your mental health one week at a time.
      </p>
      <p>
        Creators: Michael, Aafreen, Ashank, Aslan, Ethan, Iggy, Judah, Natalie, Niranjan
      </p>
    </div>
  );
};
export default About;
