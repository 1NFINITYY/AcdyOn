const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateRecommendation = async ({
  qualification,
  experience,
  profession,
  careerGoal,
}) => {
  try {
    const prompt = `
You are an expert academic career advisor.

Analyze the candidate profile and return ONLY valid JSON.

Format:

{
  "recommendation": "PhD",
  "reason": "A PhD is recommended because the candidate's career goals are research-oriented and aligned with academic advancement."
}

Allowed recommendations:
- Certification Program
- DBA
- PhD
- Honorary Doctorate

Decision Rules:

1. PhD
   - Research-focused careers
   - Academic careers
   - AI, Machine Learning, Data Science research
   - Scientist roles
   - University teaching

2. DBA
   - 8+ years of professional experience
   - Leadership, management, business growth

3. Honorary Doctorate
   - 20+ years experience
   - Major industry impact
   - Significant public contribution

4. Certification Program
   - Fresh graduates
   - Early-career professionals
   - Skill enhancement

Candidate Profile:

Qualification: ${qualification}
Years of Experience: ${experience}
Current Profession: ${profession}
Career Goal: ${careerGoal}

Return ONLY valid JSON. No markdown. No explanation outside JSON.
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text().trim();

    console.log("Gemini Response:", response);

    const parsed = JSON.parse(response);

    return {
      recommendation: parsed.recommendation,
      reason: parsed.reason,
    };
  } catch (error) {
    console.error(
      "Gemini API Error:",
      error.message
    );

    const goal = careerGoal.toLowerCase();

    let recommendation =
      "Certification Program";

    let reason =
      "A certification program is recommended to strengthen relevant skills and knowledge.";

    if (
      goal.includes("research") ||
      goal.includes("scientist") ||
      goal.includes("academic") ||
      goal.includes("ai")
    ) {
      recommendation = "PhD";
      reason =
        "A PhD is recommended because your career goal focuses on research and academic advancement.";
    } else if (experience >= 20) {
      recommendation =
        "Honorary Doctorate";
      reason =
        "An Honorary Doctorate is recommended due to your extensive professional experience and potential industry impact.";
    } else if (experience >= 8) {
      recommendation = "DBA";
      reason =
        "A DBA is recommended because of your professional experience and leadership potential.";
    }

    return {
      recommendation,
      reason,
    };
  }
};

module.exports = generateRecommendation;