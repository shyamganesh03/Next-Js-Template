/**
 * @swagger
 * /api/personalization:
 *   post:
 *     tags:
 *       - Personalization
 *     summary: Generate user personalization data
 *     description: Accepts user inputs like name, industry, style preferences, and color preferences to create a personalized recommendation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *                 description: "The name of the user."
 *               industry:
 *                 type: string
 *                 example: "Fashion"
 *                 description: "The user's industry of interest."
 *               stylePreference:
 *                 type: string
 *                 example: "Minimalistic"
 *                 description: "The user's preferred style."
 *               colorPreference:
 *                 type: string
 *                 example: "Black and White"
 *                 description: "The user's preferred color scheme."
 *     responses:
 *       200:
 *         description: Successfully generated personalization data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Personalization generated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     industry:
 *                       type: string
 *                       example: "Fashion"
 *                     recommendations:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "Try these minimalistic designs in black and white."
 *       400:
 *         description: Bad request. Missing or invalid input data.
 *       500:
 *         description: Internal server error. Something went wrong during processing.
 */

import OpenAI from 'openai'

export async function POST(_request: Request) {
  const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
  }

  const openai = new OpenAI(configuration)
  const { name, industry, stylePreference, colorPreference } =
    await _request.json()
  const userInputs = {
    name, //: 'John Doe',
    industry, //: 'Fashion',
    stylePreference, //: 'Minimalistic',
    colorPreference, //: 'Black and White',
  }

  const prompt = `
    You are a digital profile designer. Based on the following inputs, suggest a design theme, layout, and color palette that aligns with the user’s brand identity:
    - Name: ${userInputs.name}
    - Industry: ${userInputs.industry}
    - Style Preference: ${userInputs.stylePreference}
    - Color Preference: ${userInputs.colorPreference}

    Respond with clear design recommendations for:
    1. Layout
    2. Color Palette
    3. Font Styles
    4. Additional Design Elements
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  })

  return response.choices[0].message
}
