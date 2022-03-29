import { useEffect, useState } from "react";
import ImageUploadPreview from "./ImageUploadPreview";
function AddEditRecipeForm({
  existingRecipe,
  handleAddRecipe,
  handleUpdateRecipe,
  handleDeleteRecipe,
  handleEditRecipeCancel,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [directions, setDirections] = useState("");
  const [ingridients, setIngridients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name);
      setCategory(existingRecipe.category);
      setDirections(existingRecipe.directions);
      setPublishDate(existingRecipe.publishDate.toISOString().split("T")[0]);
      setIngridients(existingRecipe.ingridients);
      setImageUrl(existingRecipe.imageUrl);

      console.log(
        "[useEffect] existing recipe, existingRecipe = ",
        existingRecipe.imageUrl
      );
    } else {
      resetForm();
    }
  }, [existingRecipe]);

  function handleAddIngredient(e) {
    if (e.key && e.key !== "Enter") {
      return;
    }
    e.preventDefault();

    if (!ingredientName) {
      alert("Missing ingredient field!");
      return;
    }

    setIngridients([...ingridients, ingredientName]);
    setIngredientName("");
  }

  function handleRecipeFormSubmit(e) {
    e.preventDefault();
    if (ingridients.length === 0) {
      alert("Ingredient cant be empty!");
      return;
    }

    if (!imageUrl) {
      alert("Missing recipe immage, please add it!");
      return;
    }

    const isPublished = new Date(publishDate) <= new Date() ? true : false;
    const newRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      isPublished,
      ingridients,
      imageUrl,
    };

    if (existingRecipe) {
      handleUpdateRecipe(newRecipe, existingRecipe.id);
    } else {
      handleAddRecipe(newRecipe);
    }

    resetForm();
  }

  function resetForm() {
    setName("");
    setCategory("");
    setDirections("");
    setPublishDate("");
    setIngridients([]);
    setImageUrl("");
  }

  return (
    <form
      onSubmit={handleRecipeFormSubmit}
      className="add-edit-recipe-form-container"
    >
      {existingRecipe ? <h2>Update Recipe</h2> : <h2>Add a new recipe</h2>}
      <div className="top-form-section">
        <div className="image-input-box">
          Recipe Image
          <ImageUploadPreview
            basePath="recipes"
            existingImageUrl={imageUrl}
            handleUploadFinish={(downloadUrl) => {
              console.log("[handleUploadFinish] downloadUrl = ", downloadUrl);
              setImageUrl(downloadUrl);
            }}
            handleUploadCancel={() => {
              console.log("handleUploadCancel");
              setImageUrl("");
            }}
          />
        </div>
        <div className="fields">
          <label className="recipe-label input-label">
            Recipe Name:
            <input
              className="input-text"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label className="recipe-label input-label">
            Category:
            <select
              className="select"
              required
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value=""></option>
              <option value="breadsSandwichesAndPizza">
                Breads, Sandwiches, and Pizza
              </option>
              <option value="eggsAndBreakfast">Eggs and breakfast</option>
              <option value="desertsAndBakedGoods">
                Deserts and Baked Goods
              </option>
              <option value="fishAndSeafood">Fish and Seafood</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </label>
          <label className="recipe-label input-label">
            Directions:
            <textarea
              className="input-text directions"
              required
              value={directions}
              onChange={(e) => {
                setDirections(e.target.value);
              }}
            ></textarea>
          </label>
          <label className="recipe-label input-label">
            Publish Date:
            <input
              className="input-text"
              type="date"
              required
              value={publishDate}
              onChange={(e) => {
                setPublishDate(e.target.value);
              }}
            />
          </label>
        </div>
      </div>
      <div className="ingredients-list">
        <h3 className="text-center">Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th className="table-header">Ingredient</th>
              <th className="table-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingridients && ingridients.length > 0
              ? ingridients.map((ingredient) => {
                  return (
                    <tr key={ingredient}>
                      <td className="table-data text-center">{ingredient}</td>
                      <td className="ingredient-delete-box">
                        <button
                          type="button"
                          className="secondary-button ingredient-delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {ingridients && ingridients.length == 0 ? (
          <h3 className="text-center no-ingredients">
            No ingredients added yet!
          </h3>
        ) : null}
        <div className="ingredient-form">
          <label className="ingredient-label">
            Ingredient:
            <input
              className="input-text"
              type="text"
              value={ingredientName}
              onKeyPress={handleAddIngredient}
              onChange={(e) => {
                setIngredientName(e.target.value);
              }}
              placeholder="ex. one cup of sugar"
            />
          </label>
          <button
            type="button"
            className="primary-button add-ingredient-button"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
      </div>
      <div className="action-buttons">
        <button type="submit" className="primary-button action-button">
          {existingRecipe ? "Update Recipe" : "Create Recipe"}
        </button>
        {existingRecipe ? (
          <>
            <button
              type="button"
              onClick={handleEditRecipeCancel}
              className="primary-button action-button"
            >
              Cancel
            </button>
            <button
              type="button"
              className="primary-button action-button"
              onClick={() => handleDeleteRecipe(existingRecipe.id)}
            >
              Delete
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
}

export default AddEditRecipeForm;
