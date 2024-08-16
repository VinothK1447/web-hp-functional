/**
 * Gets bounding boxes for an element. This is implemented for you
 */
export function getElementBounds(elem: HTMLElement) {
  const bounds = elem.getBoundingClientRect();
  const top = bounds.top + window.scrollY;
  const left = bounds.left + window.scrollX;

  return {
    x: left,
    y: top,
    top,
    left,
    width: bounds.width,
    height: bounds.height,
  };
}
/**
 * **TBD:** Implement a function that checks if a point is inside an element
 */
export function isPointInsideElement(
  coordinate: { x: number; y: number },
  element: HTMLElement,
): boolean {
  let isInBound = false;
  if (coordinate.x && coordinate.y && element) {
    let elemX = element.offsetLeft;
    let elemY = element.offsetTop;

    if (coordinate.x <= elemX && coordinate.y <= elemY) {
      isInBound = true;
    }
  }
  return isInBound;
}

/**
 * **TBD:** Implement a function that returns the height of the first line of text in an element
 * We will later use this to size the HTML element that contains the hover player
 */
export function getLineHeightOfFirstLine(element: HTMLElement): number {
  if (!element) {
    return 0;
  }
  let computedStyle = window.getComputedStyle(element);
  let elemLineHeight = computedStyle.getPropertyValue("line-height");
  return parseInt(elemLineHeight.split("px")[0]);
}

export type HoveredElementInfo = {
  element: HTMLElement;
  top: number;
  left: number;
  heightOfFirstLine: number;
};

/**
 * **TBD:** Implement a React hook to be used to help to render hover player
 * Return the absolute coordinates on where to render the hover player
 * Returns null when there is no active hovered paragraph
 * Note: If using global event listeners, attach them window instead of document to ensure tests pass
 */
export function useHoveredParagraphCoordinate(
  parsedElements: HTMLElement[],
): HoveredElementInfo | null {
  let filteredPara = Array.from(parsedElements).filter((pe: HTMLElement) => {
    let paraElem = pe.nodeName;
    if (paraElem === "P" || paraElem === "p") {
      return pe;
    }
  });
  let selectedBound;
  if (filteredPara.length) {
    selectedBound = getElementBounds(filteredPara[0]);
  }
  let returnObj = {
    element: filteredPara[0],
    top: selectedBound?.top || 0,
    left: selectedBound?.left || 0,
    heightOfFirstLine: getLineHeightOfFirstLine(filteredPara[0]),
  };
  return returnObj;
}
