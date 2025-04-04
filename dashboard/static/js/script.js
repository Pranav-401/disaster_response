document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const generateReportButton = document.querySelector(".btn-generate-report");
  const groupFilesContainer = document.querySelector(".group-files");
  const fileCountElement = document.querySelector(".file-count");
  const selectedFilesElement = document.querySelector(".selected-files span");

  let fileCounter = 0; // Initial count of files

  // Function to format the date
  const formatDate = (date) => {
      return date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "2-digit",
          year: "numeric",
      });
  };

  // Function to add a new file row
  const addNewFile = () => {
      console.log("Generate Report button clicked");

      fileCounter++; // Increment file counter

      // Create a new file object with random values
      const newFile = {
          id: `file${fileCounter}`,
          name: `Report_${fileCounter}.pdf`,
          type: "PDF File",
          size: Math.floor(Math.random() * 100) + 50, // Random size between 50 KB and 150 KB
          date: new Date(),
          icon: `<a href="${reportUrl}" download><i data-lucide="download"></i></a>`, // Link to download
      };

      // Create the HTML for the new file row
      const fileItem = document.createElement("tr"); // Create a table row
      fileItem.innerHTML = `
          <td>
              <input type="checkbox" class="file-checkbox">
          </td>
          <td> <span>${newFile.name}</span> </td>
          <td>${newFile.type}</td>
          <td>${newFile.size} KB</td>
          <td>${formatDate(newFile.date)}</td>
          <td>
              ${newFile.icon} 
          </td>
      `;

      // Append the new row to the table body
      document.querySelector(".group-files tbody").appendChild(fileItem);

      lucide.createIcons();
      // Update file count display
      // fileCountElement.textContent = `${fileCounter} Files`;

      // Refresh Lucide icons after appending the row
      lucide.createIcons();

      console.log("New file added:", newFile); // Log the new file for debugging
  };

  // Attach event listener to the "Generate Report" button
  if (generateReportButton) {
    generateReportButton.addEventListener("click", addNewFile);
  } else {
    console.log("Generate Report button not found!"); // Debug if the button is missing
  }

  // Handle file selection
  groupFilesContainer.addEventListener("change", (event) => {
      if (event.target.classList.contains("file-checkbox")) {
          const selectedFiles = document.querySelectorAll(".file-checkbox:checked").length;
          selectedFilesElement.textContent = `${selectedFiles} files selected`;
      }
  });
});
