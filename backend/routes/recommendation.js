const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");
const generateRecommendation = require("../services/gemini");

/*
POST /api/recommend
*/

router.post("/recommend", async (req, res) => {
  try {
    const {
      fullName,
      email,
      qualification,
      experience,
      profession,
      careerGoal,
    } = req.body;

    // Validation
    if (
      !fullName ||
      !email ||
      !qualification ||
      experience === undefined ||
      !profession ||
      !careerGoal
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Generate recommendation using Gemini
    const recommendationData =
  await generateRecommendation({
    qualification,
    experience,
    profession,
    careerGoal,
  });

  const recommendation =
    recommendationData.recommendation;

  const reason =
    recommendationData.reason;

    // Save to Supabase
    const { data, error } = await supabase
      .from("submissions")
      .insert([
        {
          full_name: fullName,
          email,
          qualification,
          experience,
          profession,
          career_goal: careerGoal,
          recommendation,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);

      return res.status(500).json({
        success: false,
        message: "Database Error",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      recommendation,
      reason,
      submission: data[0],
    });
  } catch (error) {
    console.error("Recommendation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

/*
GET /api/submissions
*/

router.get("/submissions", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      count: data.length,
      submissions: data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/gemini-test", async (req, res) => {
  res.json({
    keyExists: !!process.env.GEMINI_API_KEY,
    firstChars:
      process.env.GEMINI_API_KEY?.slice(0, 10),
  });
});

module.exports = router;