import { getPageTitles } from "@/features/page/services/page-service";
import { IPage } from "@/features/page/types/page.types";
import tippy from "tippy.js";

export function openPageMenu(
  spaceId: string,
  onSelect: (selectedPageId: Partial<IPage>) => void
) {
  // Perform an API call to fetch the list of pages
  getPageTitles(spaceId) // Replace with your actual API endpoint
    .then((pages) => {
      console.log("pages", pages);

      // Create a container for the modal content
      const pageModal = document.createElement("div");
      pageModal.classList.add("page-modal"); // Add a class for custom styling

      // Create a list of pages as options
      pages.forEach((page: Partial<IPage>, i) => {
        const pageDiv = document.createElement("div");
        pageDiv.textContent = page.title;
        pageDiv.classList.add("page-item");
        pageDiv.addEventListener("click", () => {
          onSelect(page); // Pass the selected page to the callback
          pageModal.remove();
        });
        pageModal.appendChild(pageDiv);
        // if (i === 0) pageDiv.focus();
      });

      // Render the modal
      tippy("body", {
        showOnCreate: true,
        content: pageModal,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
        onHide() {
          pageModal.remove(); // Clean up the DOM when modal is hidden
        },
      });
    })
    .catch((error) => console.error("Error fetching pages:", error));
}
