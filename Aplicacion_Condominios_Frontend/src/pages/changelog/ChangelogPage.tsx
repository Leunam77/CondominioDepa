import React, { useEffect, useState } from "react";
import "./style.css";
import { CategoryForm } from "./categoryService/registerCategory/CategoryForm";
import CategoryList from "./categoryService/categoryList/CategoryList";
import { getAllCategories } from "../../mantenimiento/services/maintenance/categoryService";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { deleteCategory } from "../../mantenimiento/services/maintenance/categoryService";

type Props = {};

const ChangelogPage = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    { id: number; catnombre: string; catdescripcion: string }[]
  >([]);

  const [flag, setFlag] = useState(true);
  const [dataToEdit, setDataToEdit] = useState<{
    id: number;
    catnombre: string;
    catdescripcion: string;
  }>({ id: 0, catnombre: "", catdescripcion: "" });

  const handleRegisterCategory = (
    id: number,
    catnombre: string,
    catdescripcion: string
  ) => {
    setCategories([...categories, { id, catnombre, catdescripcion }]);
  };

<<<<<<< HEAD
=======
  const handleEditCategory = (
    id: number,
    catnombre: string,
    catdescripcion: string
  ) => {
    const categoryFound = categories.findIndex((element) => element.id === id);
    if (categoryFound !== -1) {
      categories[categoryFound] = {
        ...categories[categoryFound],
        catnombre: catnombre,
        catdescripcion: catdescripcion,
      };
    }
  };

>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
  const handleDelete = (id: number) => {
    deleteItem(id);
  };

  const deleteItem = async (id: number) => {
    try {
<<<<<<< HEAD
      console.log("Flag antes:", flag);
      deleteCategory(id);
      setFlag(!flag);
      console.log("Flag despues:", flag);
=======
      deleteCategory(id);
      setFlag(!flag);
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, [flag]);

  const getCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {}
  };

  const handleEdit = (
    category: React.SetStateAction<{
      id: number;
      catnombre: string;
      catdescripcion: string;
    }>
  ) => {
    console.log("🚀 ~ ChangelogPage ~ category:", category);
    setIsEditing(true);
    setDataToEdit(category);
  };

  return (
    <>
      <h2>CATEGORÍAS DE SERVICIOS</h2>
      <div id="content">
<<<<<<< HEAD
        <CategoryForm onRegister={handleRegisterCategory} />
=======
        <CategoryForm
          onRegister={handleRegisterCategory}
          isEditing={isEditing}
          dataToEdit={dataToEdit}
          setIsEditing={setIsEditing}
          setDataToEdit={setDataToEdit}
          handleEditCategory={handleEditCategory}
        />
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
        <div className="row">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="left">Nombre de la categoría</th>
                  <th className="left">Descripción</th>
                  <th className="righ">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category.catnombre}</td>
                    <td>{category.catdescripcion}</td>
                    <td className="actions">
<<<<<<< HEAD
                      <button type="button">
=======
                      <button
                        type="button"
                        onClick={() => handleEdit(category)}
                      >
>>>>>>> 2f4ed784a9fa4803a19c1be88b2d024cefb478af
                        <CreateOutlinedIcon fontSize="large" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(category.id)}
                      >
                        <DeleteOutlinedIcon fontSize="large" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangelogPage;
