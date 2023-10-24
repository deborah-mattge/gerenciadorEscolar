export function getOneLS(param) {
  if (typeof window !== "undefined") {
    const element = localStorage.getItem(param);
    if (element !== null) {
      try {
        return JSON.parse(element);
      } catch (error) {
        console.error(error);
      }
    }
  }
  return [];
}

export function getAllLS(param) {
    if (typeof window !== "undefined") {
      const element = localStorage.getItem(param);
      if (element !== null) {
        try {
          return JSON.parse(element);
        } catch (error) {
          console.error(error);
        }
      }
    }
    return [];
  }
