//Funcion que se encarga de eliminar la previsualizacion de la imagen seleccionada.
export const handleRemoveFilePreview = (
  fileInputRef,
  setFile,
  setPreviewUrl
) => {
  setFile(null);
  setPreviewUrl('');

  //Eliminamos la clase 'active' del boton de input.
  fileInputRef.current.classList.remove('active');

  //Restablecemos el valor del input de tipo file a null.
  if (fileInputRef.current) {
    fileInputRef.current.value = '';
  }
};
