export type Severity = 'low' | 'moderate' | 'high';
export type DiseaseType = 'internal' | 'external';
export type BodySystem = 'cardiovascular' | 'respiratory' | 'digestive' | 'endocrine' | 'nervous' | 'musculoskeletal' | 'urinary' | 'immune' | 'skin' | 'general';

export interface Disease {
  id: string;
  name: string;
  type: DiseaseType;
  category: string;
  bodySystem: BodySystem;
  severity: Severity;
  description: string;
  symptoms: string[];
  precautions: string[];
  temporaryRelief: string[];
  longTermManagement: string[];
  dietSuggestions: string[];
  dailyHabits: string[];
  whatToAvoid: string[];
  whenToSeeDoctor: string[];
}

export const internalDiseases: Disease[] = [
  {
    id: 'diabetes-type2',
    name: 'Type 2 Diabetes',
    type: 'internal',
    category: 'Metabolic Disorder',
    bodySystem: 'endocrine',
    severity: 'moderate',
    description: 'A chronic condition affecting how your body metabolizes sugar (glucose), leading to high blood sugar levels.',
    symptoms: ['Increased thirst', 'Frequent urination', 'Increased hunger', 'Fatigue', 'Blurred vision', 'Slow-healing sores', 'Tingling in hands/feet', 'Unexplained weight loss'],
    precautions: ['Monitor blood sugar regularly', 'Take medications as prescribed', 'Maintain healthy weight', 'Stay physically active'],
    temporaryRelief: ['Drink water to stay hydrated', 'Rest when fatigued', 'Eat small balanced meals', 'Avoid sugary snacks'],
    longTermManagement: ['Regular HbA1c testing', 'Annual eye exams', 'Foot care routine', 'Regular doctor visits', 'Medication adherence'],
    dietSuggestions: ['Whole grains', 'Leafy vegetables', 'Lean proteins', 'Low glycemic fruits', 'Healthy fats like nuts'],
    dailyHabits: ['30 minutes of walking', 'Check blood sugar levels', 'Take medications on time', 'Stay hydrated', 'Get adequate sleep'],
    whatToAvoid: ['Sugary beverages', 'Refined carbohydrates', 'Processed foods', 'Excessive alcohol', 'Skipping meals'],
    whenToSeeDoctor: ['Blood sugar over 300 mg/dL', 'Symptoms of hypoglycemia', 'Signs of infection', 'Vision changes', 'Numbness or pain in extremities']
  },
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    type: 'internal',
    category: 'Cardiovascular',
    bodySystem: 'cardiovascular',
    severity: 'moderate',
    description: 'A condition where blood pressure against artery walls is consistently too high, potentially leading to heart disease.',
    symptoms: ['Often asymptomatic', 'Headaches', 'Shortness of breath', 'Nosebleeds', 'Dizziness', 'Chest pain', 'Vision problems'],
    precautions: ['Monitor blood pressure regularly', 'Reduce sodium intake', 'Maintain healthy weight', 'Limit alcohol'],
    temporaryRelief: ['Deep breathing exercises', 'Rest in quiet environment', 'Avoid stressful situations', 'Light stretching'],
    longTermManagement: ['Regular BP monitoring', 'Consistent medication use', 'Stress management', 'Regular exercise', 'Healthy diet'],
    dietSuggestions: ['DASH diet', 'Low sodium foods', 'Potassium-rich foods', 'Whole grains', 'Fresh fruits and vegetables'],
    dailyHabits: ['Morning walk', 'Meditation or yoga', 'Limit caffeine', 'Regular sleep schedule', 'BP monitoring'],
    whatToAvoid: ['High sodium foods', 'Processed meats', 'Excessive caffeine', 'Smoking', 'High stress situations'],
    whenToSeeDoctor: ['BP above 180/120', 'Severe headache', 'Chest pain', 'Difficulty breathing', 'Vision changes', 'Confusion']
  },
  {
    id: 'asthma',
    name: 'Asthma',
    type: 'internal',
    category: 'Respiratory',
    bodySystem: 'respiratory',
    severity: 'moderate',
    description: 'A chronic respiratory condition causing inflammation and narrowing of airways, leading to breathing difficulties.',
    symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing (especially at night)', 'Difficulty sleeping', 'Fatigue during exercise'],
    precautions: ['Identify and avoid triggers', 'Keep rescue inhaler nearby', 'Follow action plan', 'Get flu vaccination'],
    temporaryRelief: ['Use rescue inhaler', 'Sit upright', 'Breathe slowly', 'Move to clean air', 'Stay calm'],
    longTermManagement: ['Daily controller medications', 'Regular doctor visits', 'Peak flow monitoring', 'Allergy management', 'Asthma action plan'],
    dietSuggestions: ['Anti-inflammatory foods', 'Vitamin D rich foods', 'Omega-3 fatty acids', 'Fresh fruits', 'Ginger and turmeric'],
    dailyHabits: ['Take controller medications', 'Clean living spaces', 'Use air purifier', 'Warm-up before exercise', 'Monitor peak flow'],
    whatToAvoid: ['Smoke and air pollution', 'Strong odors', 'Cold dry air', 'Pet dander (if allergic)', 'Dust mites'],
    whenToSeeDoctor: ['Rescue inhaler not helping', 'Severe breathing difficulty', 'Blue lips or fingernails', 'Cannot speak full sentences', 'Peak flow below 50%']
  },
  {
    id: 'anemia',
    name: 'Anemia',
    type: 'internal',
    category: 'Blood Disorder',
    bodySystem: 'cardiovascular',
    severity: 'moderate',
    description: 'A condition where you lack enough healthy red blood cells to carry adequate oxygen to your body\'s tissues.',
    symptoms: ['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath', 'Dizziness', 'Cold hands and feet', 'Headache', 'Brittle nails'],
    precautions: ['Get regular blood tests', 'Take iron supplements if prescribed', 'Eat iron-rich foods', 'Address underlying causes'],
    temporaryRelief: ['Rest frequently', 'Avoid strenuous activity', 'Stay hydrated', 'Eat small frequent meals'],
    longTermManagement: ['Regular blood work', 'Iron or B12 supplementation', 'Treat underlying conditions', 'Dietary changes', 'Regular check-ups'],
    dietSuggestions: ['Iron-rich foods (spinach, red meat)', 'Vitamin C for absorption', 'Fortified cereals', 'Legumes and beans', 'Dark leafy greens'],
    dailyHabits: ['Take supplements with vitamin C', 'Avoid tea/coffee with meals', 'Eat balanced meals', 'Light exercise as tolerated', 'Adequate rest'],
    whatToAvoid: ['Calcium with iron supplements', 'Tea and coffee with meals', 'Excessive dairy during iron intake', 'Skipping meals', 'Overexertion'],
    whenToSeeDoctor: ['Severe fatigue', 'Rapid heartbeat', 'Chest pain', 'Fainting', 'Blood in stool', 'Heavy menstrual bleeding']
  },
  {
    id: 'hypothyroidism',
    name: 'Hypothyroidism',
    type: 'internal',
    category: 'Thyroid Disorder',
    bodySystem: 'endocrine',
    severity: 'moderate',
    description: 'A condition where the thyroid gland doesn\'t produce enough thyroid hormone, affecting metabolism.',
    symptoms: ['Fatigue', 'Weight gain', 'Cold sensitivity', 'Dry skin', 'Constipation', 'Depression', 'Muscle weakness', 'Slow heart rate', 'Memory problems'],
    precautions: ['Take medication consistently', 'Regular thyroid tests', 'Monitor symptoms', 'Inform doctors of condition'],
    temporaryRelief: ['Dress warmly', 'Rest when tired', 'Moisturize skin', 'Gentle exercise', 'Balanced meals'],
    longTermManagement: ['Daily thyroid medication', 'Regular TSH testing', 'Consistent medication timing', 'Monitor weight', 'Annual check-ups'],
    dietSuggestions: ['Selenium-rich foods', 'Iodine (in moderation)', 'High-fiber foods', 'Lean proteins', 'Avoid goitrogens (raw cruciferous)'],
    dailyHabits: ['Take medication on empty stomach', 'Wait before eating', 'Regular exercise', 'Consistent sleep schedule', 'Stay hydrated'],
    whatToAvoid: ['Soy products near medication', 'Excessive iodine', 'Skipping medications', 'High-fat meals before medication', 'Calcium supplements near medication'],
    whenToSeeDoctor: ['Severe fatigue', 'Significant weight changes', 'Depression worsening', 'Heart palpitations', 'Swelling in neck', 'Muscle pain']
  },
  {
    id: 'gastritis',
    name: 'Gastritis',
    type: 'internal',
    category: 'Digestive',
    bodySystem: 'digestive',
    severity: 'low',
    description: 'Inflammation of the stomach lining that can cause pain, nausea, and digestive issues.',
    symptoms: ['Upper abdominal pain', 'Nausea', 'Vomiting', 'Bloating', 'Loss of appetite', 'Indigestion', 'Burning sensation'],
    precautions: ['Avoid trigger foods', 'Eat smaller meals', 'Reduce stress', 'Limit NSAIDs use'],
    temporaryRelief: ['Antacids', 'Small bland meals', 'Avoid lying down after eating', 'Ginger tea', 'Cool water'],
    longTermManagement: ['H. pylori treatment if needed', 'Proton pump inhibitors', 'Dietary modifications', 'Stress management', 'Regular meals'],
    dietSuggestions: ['Bland foods', 'Cooked vegetables', 'Lean proteins', 'Low-acid fruits', 'Probiotics'],
    dailyHabits: ['Eat regular meals', 'Chew food thoroughly', 'Avoid eating late', 'Manage stress', 'Stay upright after meals'],
    whatToAvoid: ['Spicy foods', 'Alcohol', 'Caffeine', 'Acidic foods', 'NSAIDs', 'Smoking'],
    whenToSeeDoctor: ['Blood in vomit or stool', 'Severe abdominal pain', 'Unexplained weight loss', 'Persistent symptoms', 'Difficulty swallowing']
  },
  {
    id: 'copd',
    name: 'COPD (Chronic Obstructive Pulmonary Disease)',
    type: 'internal',
    category: 'Respiratory',
    bodySystem: 'respiratory',
    severity: 'high',
    description: 'A chronic inflammatory lung disease causing obstructed airflow and breathing difficulties.',
    symptoms: ['Chronic cough', 'Shortness of breath', 'Wheezing', 'Chest tightness', 'Frequent respiratory infections', 'Fatigue', 'Mucus production'],
    precautions: ['Quit smoking', 'Avoid air pollutants', 'Get vaccinations', 'Use medications as prescribed'],
    temporaryRelief: ['Pursed lip breathing', 'Use bronchodilator', 'Rest', 'Stay calm', 'Sit upright'],
    longTermManagement: ['Pulmonary rehabilitation', 'Oxygen therapy if needed', 'Regular medications', 'Breathing exercises', 'Regular check-ups'],
    dietSuggestions: ['High-protein foods', 'Complex carbohydrates', 'Healthy fats', 'Anti-inflammatory foods', 'Adequate fluids'],
    dailyHabits: ['Breathing exercises', 'Light physical activity', 'Clear airways', 'Take medications', 'Monitor symptoms'],
    whatToAvoid: ['Smoking', 'Air pollution', 'Dust', 'Strong fumes', 'Cold air', 'Respiratory irritants'],
    whenToSeeDoctor: ['Worsening breathlessness', 'Blue lips', 'Confusion', 'Rapid heartbeat', 'Fever with breathing issues', 'Swelling in ankles']
  },
  {
    id: 'migraine',
    name: 'Migraine',
    type: 'internal',
    category: 'Neurological',
    bodySystem: 'nervous',
    severity: 'moderate',
    description: 'A neurological condition causing intense, debilitating headaches often with sensory disturbances.',
    symptoms: ['Severe throbbing headache', 'Nausea', 'Vomiting', 'Light sensitivity', 'Sound sensitivity', 'Aura (visual disturbances)', 'Fatigue'],
    precautions: ['Identify triggers', 'Maintain regular sleep', 'Stay hydrated', 'Manage stress', 'Regular meals'],
    temporaryRelief: ['Dark quiet room', 'Cold compress', 'Pain medication early', 'Rest', 'Caffeine (in moderation)'],
    longTermManagement: ['Preventive medications', 'Trigger avoidance', 'Regular sleep schedule', 'Stress management', 'Headache diary'],
    dietSuggestions: ['Regular meals', 'Magnesium-rich foods', 'Stay hydrated', 'Avoid trigger foods', 'Riboflavin sources'],
    dailyHabits: ['Consistent sleep schedule', 'Regular exercise', 'Stay hydrated', 'Stress reduction', 'Track triggers'],
    whatToAvoid: ['Aged cheeses', 'Alcohol', 'Processed meats', 'MSG', 'Artificial sweeteners', 'Skipping meals', 'Irregular sleep'],
    whenToSeeDoctor: ['Worst headache ever', 'Fever with headache', 'Confusion', 'Vision loss', 'Weakness', 'Frequent migraines', 'Medications not working']
  },
  {
    id: 'arthritis-rheumatoid',
    name: 'Rheumatoid Arthritis',
    type: 'internal',
    category: 'Autoimmune',
    bodySystem: 'musculoskeletal',
    severity: 'moderate',
    description: 'An autoimmune disorder causing chronic inflammation of joints, leading to pain and damage.',
    symptoms: ['Joint pain', 'Joint swelling', 'Morning stiffness', 'Fatigue', 'Fever', 'Loss of appetite', 'Joint deformity over time'],
    precautions: ['Take medications as prescribed', 'Protect joints', 'Balance activity and rest', 'Regular monitoring'],
    temporaryRelief: ['Hot/cold therapy', 'Rest affected joints', 'Gentle stretching', 'Pain medications', 'Joint supports'],
    longTermManagement: ['Disease-modifying drugs', 'Regular rheumatologist visits', 'Physical therapy', 'Joint protection', 'Healthy lifestyle'],
    dietSuggestions: ['Anti-inflammatory foods', 'Omega-3 fatty acids', 'Colorful vegetables', 'Whole grains', 'Olive oil'],
    dailyHabits: ['Gentle morning stretches', 'Low-impact exercise', 'Joint protection techniques', 'Adequate rest', 'Medication adherence'],
    whatToAvoid: ['Smoking', 'Excessive alcohol', 'Processed foods', 'Saturated fats', 'Overexertion', 'High-impact activities'],
    whenToSeeDoctor: ['New joint involvement', 'Medication side effects', 'Severe pain', 'Fever', 'Infection signs', 'Worsening symptoms']
  },
  {
    id: 'chronic-kidney-disease',
    name: 'Chronic Kidney Disease',
    type: 'internal',
    category: 'Renal',
    bodySystem: 'urinary',
    severity: 'high',
    description: 'Progressive loss of kidney function over time, affecting waste filtering and fluid balance.',
    symptoms: ['Fatigue', 'Swelling in feet/ankles', 'Decreased urination', 'Shortness of breath', 'Nausea', 'Confusion', 'High blood pressure'],
    precautions: ['Control blood pressure', 'Manage diabetes', 'Avoid nephrotoxic drugs', 'Regular kidney function tests'],
    temporaryRelief: ['Elevate swollen limbs', 'Rest', 'Limit fluids if advised', 'Low-sodium diet', 'Medications as prescribed'],
    longTermManagement: ['Medication management', 'Dietary restrictions', 'Regular monitoring', 'Blood pressure control', 'Treat underlying conditions'],
    dietSuggestions: ['Low sodium', 'Low potassium', 'Low phosphorus', 'Controlled protein', 'Heart-healthy fats'],
    dailyHabits: ['Monitor blood pressure', 'Take medications', 'Track fluid intake', 'Light exercise', 'Regular meals'],
    whatToAvoid: ['High sodium foods', 'NSAIDs', 'Excessive protein', 'High potassium foods', 'Phosphorus additives', 'Smoking'],
    whenToSeeDoctor: ['Decreased urination', 'Severe swelling', 'Chest pain', 'Confusion', 'Difficulty breathing', 'Blood in urine']
  }
];

export const externalDiseases: Disease[] = [
  {
    id: 'eczema',
    name: 'Eczema (Atopic Dermatitis)',
    type: 'external',
    category: 'Skin Condition',
    bodySystem: 'skin',
    severity: 'low',
    description: 'A chronic skin condition causing dry, itchy, and inflamed skin patches.',
    symptoms: ['Dry skin', 'Itching', 'Red patches', 'Small raised bumps', 'Thickened skin', 'Cracked skin', 'Sensitive skin'],
    precautions: ['Moisturize regularly', 'Avoid triggers', 'Use gentle products', 'Keep nails short'],
    temporaryRelief: ['Cool compress', 'Moisturizing cream', 'Oatmeal baths', 'Anti-itch cream', 'Avoid scratching'],
    longTermManagement: ['Daily moisturizing', 'Identify triggers', 'Topical treatments', 'Avoid irritants', 'Regular dermatologist visits'],
    dietSuggestions: ['Anti-inflammatory foods', 'Omega-3 fatty acids', 'Probiotics', 'Avoid food triggers', 'Stay hydrated'],
    dailyHabits: ['Moisturize after bathing', 'Use lukewarm water', 'Wear soft fabrics', 'Manage stress', 'Keep skin hydrated'],
    whatToAvoid: ['Harsh soaps', 'Hot showers', 'Wool clothing', 'Known allergens', 'Stress', 'Scratching'],
    whenToSeeDoctor: ['Signs of infection', 'Severe itching affecting sleep', 'Spreading rash', 'Not improving', 'Fever with rash']
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    type: 'external',
    category: 'Skin Condition',
    bodySystem: 'skin',
    severity: 'moderate',
    description: 'An autoimmune condition causing rapid skin cell buildup, leading to thick, scaly patches.',
    symptoms: ['Red patches with silvery scales', 'Dry cracked skin', 'Itching', 'Burning', 'Thickened nails', 'Stiff joints'],
    precautions: ['Moisturize regularly', 'Avoid skin injuries', 'Manage stress', 'Limit alcohol'],
    temporaryRelief: ['Moisturizing creams', 'Coal tar products', 'Sunlight exposure', 'Cool baths', 'Salicylic acid'],
    longTermManagement: ['Topical treatments', 'Light therapy', 'Systemic medications', 'Biologics if severe', 'Regular monitoring'],
    dietSuggestions: ['Anti-inflammatory diet', 'Omega-3 rich foods', 'Colorful vegetables', 'Avoid alcohol', 'Gluten-free trial'],
    dailyHabits: ['Daily moisturizing', 'Gentle skin care', 'Stress management', 'Moderate sun exposure', 'Track flares'],
    whatToAvoid: ['Skin injuries', 'Stress', 'Smoking', 'Excessive alcohol', 'Certain medications', 'Cold dry weather'],
    whenToSeeDoctor: ['Widespread patches', 'Joint pain', 'Not responding to treatment', 'Signs of infection', 'Significant discomfort']
  },
  {
    id: 'acne',
    name: 'Acne',
    type: 'external',
    category: 'Skin Condition',
    bodySystem: 'skin',
    severity: 'low',
    description: 'A common skin condition occurring when hair follicles become clogged with oil and dead skin cells.',
    symptoms: ['Pimples', 'Blackheads', 'Whiteheads', 'Cysts', 'Nodules', 'Oily skin', 'Scarring'],
    precautions: ['Gentle cleansing', 'Avoid touching face', 'Non-comedogenic products', 'Clean items touching face'],
    temporaryRelief: ['Benzoyl peroxide', 'Salicylic acid', 'Ice for inflammation', 'Spot treatments', 'Gentle cleansing'],
    longTermManagement: ['Consistent skincare routine', 'Topical retinoids', 'Oral medications if severe', 'Professional treatments', 'Patience'],
    dietSuggestions: ['Low glycemic foods', 'Zinc-rich foods', 'Omega-3s', 'Plenty of water', 'Limit dairy (if trigger)'],
    dailyHabits: ['Cleanse twice daily', 'Don\'t pick at skin', 'Change pillowcases', 'Remove makeup before bed', 'Stay hydrated'],
    whatToAvoid: ['Touching face', 'Harsh scrubbing', 'Picking at pimples', 'Heavy makeup', 'Greasy hair products', 'Excessive sun'],
    whenToSeeDoctor: ['Severe or cystic acne', 'Scarring', 'Over-the-counter not working', 'Affecting self-esteem', 'Painful nodules']
  },
  {
    id: 'fungal-infection',
    name: 'Fungal Skin Infection (Ringworm/Tinea)',
    type: 'external',
    category: 'Infectious',
    bodySystem: 'skin',
    severity: 'low',
    description: 'A common fungal infection affecting the skin, causing ring-shaped, itchy rashes.',
    symptoms: ['Ring-shaped rash', 'Itching', 'Red scaly patches', 'Cracked skin', 'Hair loss in affected area', 'Raised borders'],
    precautions: ['Keep skin dry', 'Don\'t share personal items', 'Wear breathable fabrics', 'Clean and dry feet'],
    temporaryRelief: ['Antifungal cream', 'Keep area dry', 'Avoid scratching', 'Loose clothing', 'Cool compresses'],
    longTermManagement: ['Complete antifungal course', 'Prevent reinfection', 'Treat all affected areas', 'Disinfect items', 'Check household members'],
    dietSuggestions: ['Probiotics', 'Garlic', 'Coconut oil', 'Low sugar diet', 'Immune-boosting foods'],
    dailyHabits: ['Keep skin clean and dry', 'Change socks daily', 'Use antifungal powder', 'Wear sandals in public showers', 'Wash clothes in hot water'],
    whatToAvoid: ['Sharing towels/clothes', 'Tight clothing', 'Keeping skin moist', 'Walking barefoot in public areas', 'Scratching infected areas'],
    whenToSeeDoctor: ['Not improving with OTC treatment', 'Spreading infection', 'Signs of bacterial infection', 'Scalp involvement', 'Nail involvement']
  },
  {
    id: 'dermatitis-contact',
    name: 'Contact Dermatitis',
    type: 'external',
    category: 'Skin Condition',
    bodySystem: 'skin',
    severity: 'low',
    description: 'Skin inflammation caused by contact with irritants or allergens.',
    symptoms: ['Red rash', 'Itching', 'Dry cracked skin', 'Bumps or blisters', 'Swelling', 'Burning sensation', 'Tenderness'],
    precautions: ['Identify and avoid triggers', 'Wear protective gloves', 'Use gentle products', 'Rinse skin after exposure'],
    temporaryRelief: ['Remove irritant', 'Cool compress', 'Calamine lotion', 'Hydrocortisone cream', 'Antihistamines'],
    longTermManagement: ['Allergen avoidance', 'Patch testing', 'Barrier protection', 'Skin care routine', 'Occupational modifications'],
    dietSuggestions: ['Anti-inflammatory foods', 'Omega-3s', 'Probiotics', 'Vitamin E rich foods', 'Stay hydrated'],
    dailyHabits: ['Moisturize regularly', 'Wear protective equipment', 'Choose hypoallergenic products', 'Gentle cleansing', 'Track reactions'],
    whatToAvoid: ['Known irritants/allergens', 'Harsh chemicals', 'Fragranced products', 'Nickel jewelry', 'Latex (if allergic)'],
    whenToSeeDoctor: ['Severe reaction', 'Face or genital involvement', 'Signs of infection', 'Not improving', 'Need patch testing']
  },
  {
    id: 'vitiligo',
    name: 'Vitiligo',
    type: 'external',
    category: 'Pigmentation Disorder',
    bodySystem: 'skin',
    severity: 'low',
    description: 'A condition causing loss of skin pigmentation in patches due to melanocyte destruction.',
    symptoms: ['White patches on skin', 'Premature hair graying', 'Loss of color in mouth tissues', 'Color change in retina', 'Patches may spread'],
    precautions: ['Sun protection', 'Avoid skin trauma', 'Manage stress', 'Regular monitoring'],
    temporaryRelief: ['Concealing cosmetics', 'Self-tanning products', 'Sun protection', 'Emotional support'],
    longTermManagement: ['Topical treatments', 'Light therapy', 'Depigmentation (if widespread)', 'Support groups', 'Regular dermatology visits'],
    dietSuggestions: ['Antioxidant-rich foods', 'Vitamin B12', 'Folic acid', 'Copper and zinc foods', 'Avoid known triggers'],
    dailyHabits: ['Apply sunscreen daily', 'Protect skin from injury', 'Stress management', 'Healthy diet', 'Skin monitoring'],
    whatToAvoid: ['Excessive sun exposure', 'Skin injuries', 'Harsh chemicals', 'Stress', 'Tattoos on affected areas'],
    whenToSeeDoctor: ['New patches appearing', 'Rapid spreading', 'Emotional distress', 'Consider treatment options', 'Associated conditions']
  },
  {
    id: 'sunburn',
    name: 'Sunburn',
    type: 'external',
    category: 'Skin Damage',
    bodySystem: 'skin',
    severity: 'low',
    description: 'Skin damage from overexposure to ultraviolet (UV) radiation from the sun.',
    symptoms: ['Red painful skin', 'Warm to touch', 'Swelling', 'Blisters', 'Peeling', 'Fever', 'Chills', 'Headache'],
    precautions: ['Use sunscreen SPF 30+', 'Seek shade', 'Wear protective clothing', 'Avoid peak sun hours'],
    temporaryRelief: ['Cool compresses', 'Aloe vera gel', 'Moisturizers', 'Pain relievers', 'Stay hydrated', 'Cool baths'],
    longTermManagement: ['Sun protection habits', 'Regular skin checks', 'Monitor for skin changes', 'Avoid tanning beds', 'Protective clothing'],
    dietSuggestions: ['Hydrating foods', 'Antioxidants', 'Vitamin E', 'Omega-3s', 'Plenty of water'],
    dailyHabits: ['Apply sunscreen daily', 'Reapply every 2 hours', 'Wear hats and sunglasses', 'Check UV index', 'Seek shade'],
    whatToAvoid: ['Further sun exposure', 'Picking at peeling skin', 'Tight clothing on burn', 'Hot showers', 'Products with alcohol'],
    whenToSeeDoctor: ['Severe blistering', 'Fever over 103°F', 'Confusion', 'Severe pain', 'Signs of infection', 'Dehydration']
  },
  {
    id: 'shingles',
    name: 'Shingles (Herpes Zoster)',
    type: 'external',
    category: 'Viral Infection',
    bodySystem: 'skin',
    severity: 'moderate',
    description: 'A painful rash caused by reactivation of the varicella-zoster virus (chickenpox virus).',
    symptoms: ['Painful rash', 'Blisters', 'Burning sensation', 'Tingling', 'Fever', 'Headache', 'Fatigue', 'Light sensitivity'],
    precautions: ['Get vaccinated if eligible', 'Manage stress', 'Keep immune system healthy', 'Cover rash around others'],
    temporaryRelief: ['Antiviral medications', 'Pain relievers', 'Cool compresses', 'Calamine lotion', 'Loose clothing'],
    longTermManagement: ['Early antiviral treatment', 'Pain management', 'Prevent complications', 'Monitor for PHN', 'Vaccination for prevention'],
    dietSuggestions: ['Immune-boosting foods', 'Lysine-rich foods', 'Vitamin C', 'Zinc', 'Avoid arginine-rich foods'],
    dailyHabits: ['Keep rash clean and dry', 'Don\'t scratch blisters', 'Rest adequately', 'Stress management', 'Take medications as prescribed'],
    whatToAvoid: ['Contact with pregnant women', 'Contact with immunocompromised', 'Scratching blisters', 'Stress', 'Arginine supplements'],
    whenToSeeDoctor: ['Rash near eyes', 'Severe pain', 'Widespread rash', 'Fever', 'Confusion', 'Weakness', 'Rash not improving']
  },
  {
    id: 'hives',
    name: 'Hives (Urticaria)',
    type: 'external',
    category: 'Allergic Reaction',
    bodySystem: 'skin',
    severity: 'low',
    description: 'Raised, itchy welts on the skin that appear suddenly, often due to allergic reactions.',
    symptoms: ['Red or skin-colored welts', 'Intense itching', 'Swelling', 'Welts that change shape', 'Welts that come and go'],
    precautions: ['Identify triggers', 'Carry antihistamines', 'Wear medical alert if severe', 'Avoid known allergens'],
    temporaryRelief: ['Antihistamines', 'Cool compress', 'Avoid heat', 'Loose clothing', 'Oatmeal bath'],
    longTermManagement: ['Trigger identification', 'Daily antihistamines if chronic', 'Allergy testing', 'Stress management', 'Keep symptom diary'],
    dietSuggestions: ['Avoid food triggers', 'Anti-inflammatory diet', 'Quercetin-rich foods', 'Probiotics', 'Stay hydrated'],
    dailyHabits: ['Take antihistamines as needed', 'Avoid triggers', 'Wear loose clothing', 'Manage stress', 'Track episodes'],
    whatToAvoid: ['Known triggers', 'Tight clothing', 'Extreme temperatures', 'Stress', 'Alcohol', 'NSAIDs'],
    whenToSeeDoctor: ['Difficulty breathing', 'Throat swelling', 'Dizziness', 'Chronic hives (>6 weeks)', 'Severe symptoms', 'Anaphylaxis signs']
  },
  {
    id: 'athletes-foot',
    name: 'Athlete\'s Foot (Tinea Pedis)',
    type: 'external',
    category: 'Fungal Infection',
    bodySystem: 'skin',
    severity: 'low',
    description: 'A fungal infection affecting the feet, especially between the toes, causing itching and peeling.',
    symptoms: ['Itching between toes', 'Peeling skin', 'Redness', 'Burning sensation', 'Blisters', 'Cracked skin', 'Odor'],
    precautions: ['Keep feet dry', 'Wear breathable footwear', 'Don\'t share footwear', 'Wear sandals in public areas'],
    temporaryRelief: ['Antifungal cream', 'Keep feet dry', 'Antifungal powder', 'Change socks frequently', 'Air out shoes'],
    longTermManagement: ['Complete treatment course', 'Prevent reinfection', 'Foot hygiene routine', 'Disinfect shoes', 'Regular inspection'],
    dietSuggestions: ['Probiotics', 'Low sugar diet', 'Garlic', 'Coconut oil', 'Immune-boosting foods'],
    dailyHabits: ['Wash and dry feet thoroughly', 'Change socks daily', 'Alternate shoes', 'Use antifungal powder', 'Wear breathable socks'],
    whatToAvoid: ['Walking barefoot in public', 'Tight shoes', 'Synthetic socks', 'Sharing towels', 'Keeping feet moist'],
    whenToSeeDoctor: ['Not improving with OTC', 'Spreading infection', 'Signs of bacterial infection', 'Diabetes and foot issues', 'Nail involvement']
  }
];

export const allDiseases = [...internalDiseases, ...externalDiseases];

export const bodyParts = [
  { id: 'head', label: 'Head', icon: '🧠' },
  { id: 'eyes', label: 'Eyes', icon: '👁️' },
  { id: 'ears', label: 'Ears', icon: '👂' },
  { id: 'nose', label: 'Nose', icon: '👃' },
  { id: 'throat', label: 'Throat', icon: '🗣️' },
  { id: 'chest', label: 'Chest', icon: '🫁' },
  { id: 'heart', label: 'Heart', icon: '❤️' },
  { id: 'stomach', label: 'Stomach', icon: '🫃' },
  { id: 'back', label: 'Back', icon: '🔙' },
  { id: 'arms', label: 'Arms', icon: '💪' },
  { id: 'hands', label: 'Hands', icon: '✋' },
  { id: 'legs', label: 'Legs', icon: '🦵' },
  { id: 'feet', label: 'Feet', icon: '🦶' },
  { id: 'skin', label: 'Skin', icon: '🖐️' },
  { id: 'joints', label: 'Joints', icon: '🦴' },
  { id: 'general', label: 'General/Whole Body', icon: '🧍' },
];

export const commonSymptoms = [
  'Fatigue', 'Fever', 'Headache', 'Dizziness', 'Nausea', 'Vomiting',
  'Shortness of breath', 'Chest pain', 'Coughing', 'Wheezing',
  'Abdominal pain', 'Bloating', 'Constipation', 'Diarrhea',
  'Itching', 'Rash', 'Dry skin', 'Swelling', 'Redness',
  'Joint pain', 'Muscle weakness', 'Stiffness', 'Numbness', 'Tingling',
  'Increased thirst', 'Frequent urination', 'Weight changes', 'Appetite changes',
  'Sleep problems', 'Anxiety', 'Depression', 'Memory problems', 'Confusion',
  'Vision changes', 'Hearing changes', 'Difficulty swallowing', 'Sore throat',
  'Cold sensitivity', 'Heat intolerance', 'Night sweats', 'Chills'
];

// Symptom descriptions for tooltips
export const symptomDescriptions: Record<string, string> = {
  "Headache": "Pain or discomfort in the head, scalp, or neck area",
  "Fever": "Elevated body temperature, often indicating infection",
  "Fatigue": "Persistent tiredness or lack of energy",
  "Nausea": "Feeling of sickness with an urge to vomit",
  "Dizziness": "Sensation of spinning or loss of balance",
  "Coughing": "Forceful expulsion of air from the lungs",
  "Chest pain": "Discomfort in the chest area, can be sharp or dull",
  "Shortness of breath": "Difficulty breathing or feeling like you can't get enough air",
  "Joint pain": "Aching or soreness in body joints",
  "Muscle pain": "Discomfort or soreness in muscle tissue",
  "Muscle weakness": "Reduced strength in muscles making movements difficult",
  "Rash": "Changes in skin appearance, often itchy or red",
  "Sore throat": "Pain or scratchiness in the throat",
  "Runny nose": "Excess nasal discharge, often due to cold or allergies",
  "Back pain": "Discomfort in the back area, can affect daily activities",
  "Abdominal pain": "Pain in the stomach or belly region",
  "Vomiting": "Forceful expulsion of stomach contents",
  "Diarrhea": "Loose, watery stools occurring more frequently",
  "Constipation": "Difficulty passing stools or infrequent bowel movements",
  "Loss of appetite": "Reduced desire to eat or lack of hunger",
  "Weight changes": "Unexplained gain or loss of body weight",
  "Appetite changes": "Abnormal increase or decrease in hunger",
  "Sleep problems": "Difficulty falling or staying asleep",
  "Insomnia": "Difficulty falling or staying asleep",
  "Anxiety": "Persistent feelings of worry or nervousness",
  "Depression": "Persistent feelings of sadness or hopelessness",
  "Sweating": "Excessive perspiration, especially without physical exertion",
  "Night sweats": "Heavy sweating during sleep without external cause",
  "Swelling": "Enlargement of body parts due to fluid retention",
  "Numbness": "Loss of sensation in body parts",
  "Tingling": "Pins and needles sensation in body parts",
  "Blurred vision": "Difficulty seeing clearly or focusing",
  "Vision changes": "Any changes in how you see, including blurriness",
  "Hearing changes": "Any changes in how you hear sounds",
  "Palpitations": "Sensation of rapid, fluttering, or pounding heartbeat",
  "Dry skin": "Rough, flaky, or cracked skin lacking moisture",
  "Itching": "Irritating sensation causing the urge to scratch",
  "Wheezing": "High-pitched whistling sound when breathing",
  "Bloating": "Feeling of fullness or swelling in the abdomen",
  "Indigestion": "Discomfort in upper abdomen after eating",
  "Stiffness": "Difficulty moving joints or muscles freely",
  "Increased thirst": "Feeling very thirsty more often than usual",
  "Frequent urination": "Needing to urinate more often than normal",
  "Memory problems": "Difficulty remembering things or concentrating",
  "Confusion": "Difficulty thinking clearly or understanding",
  "Cold sensitivity": "Feeling cold more easily than others",
  "Heat intolerance": "Feeling uncomfortable or unwell in warm conditions",
  "Chills": "Feeling cold with shivering, often with fever",
  "Difficulty swallowing": "Trouble moving food or drink from mouth to stomach"
};

export function findDiseasesBySymptoms(selectedSymptoms: string[]): Disease[] {
  if (selectedSymptoms.length === 0) return [];
  
  const normalizedSelected = selectedSymptoms.map(s => s.toLowerCase());
  
  const scored = allDiseases.map(disease => {
    const diseaseSymptoms = disease.symptoms.map(s => s.toLowerCase());
    let score = 0;
    
    normalizedSelected.forEach(selected => {
      diseaseSymptoms.forEach(symptom => {
        if (symptom.includes(selected) || selected.includes(symptom)) {
          score += 2;
        } else {
          const selectedWords = selected.split(' ');
          const symptomWords = symptom.split(' ');
          selectedWords.forEach(sw => {
            symptomWords.forEach(symW => {
              if (sw.length > 3 && symW.length > 3 && (sw.includes(symW) || symW.includes(sw))) {
                score += 1;
              }
            });
          });
        }
      });
    });
    
    return { disease, score };
  });
  
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.disease);
}
