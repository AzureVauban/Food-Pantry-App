const BASE_URL = "https://searchfoodshttp-ahr...-uc.a.run.app"; // Replace with your function URL

export async function searchFoods(query: string) {
  try {
    const res = await fetch(`${BASE_URL}?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching foods:", err);
    throw err;
  }
}

export async function getFoodDetails(foodId: string) {
  try {
    const res = await fetch(`https://getfooddetails-ahr...-uc.a.run.app?food_id=${foodId}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching food details:", err);
    throw err;
  }
}
