function downloadReport() {
  
  console.log("Fetching report from:", reportUrl);  //
        fetch(reportUrl)
        .then(response => {
            if (response.ok) {
                document.getElementById("download-link").style.display = "block";
                document.getElementById("download-link").click();
            } else {
                console.error("Failed to fetch report:", response.status);
            }
  })
  .catch(error => console.error("Error:", error));
}


document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    const generateReportButton = document.querySelector(".btn-generate-report");
    const groupFilesContainer = document.querySelector(".group-files");
    const fileCountElement = document.querySelector(".file-count");
    const selectedFilesElement = document.querySelector(".selected-files span");
  
    let fileCounter = 3; // Initial count of files
    
    // Function to format the date
    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    };
  
    // Function to add a new file
    const addNewFile = () => {
       console.log("Generate Report button clicked");
      // Create a new file object
      const newFile = {
        id: `file${fileCounter + 1}`,
        name: `Report_${fileCounter + 1}.pdf`,
        type: "Pdf File",
        size: Math.floor(Math.random() * 100) + 50, // Random size between 50 KB and 150 KB
        date: new Date(),
        icon: `<a href="${reportUrl}" download><i data-lucide="download"></i></a>`,
        checked: false,
      };
       
      // Create the HTML for the new file
    const fileItem = document.createElement("div");
    fileItem.className = "file-item";
    fileItem.innerHTML = `
        <div class="col-5">
          <input type="checkbox" class="file-checkbox">
          <span>${newFile.name}</span>
        </div>
        <div class="col-2">${newFile.type}</div>
        <div class="col-2">${newFile.size} KB</div>
        <div class="col-2">${formatDate(newFile.date)}</div>
        <div class="col-1">
         ${newFile.icon} 
        </div>
    `;
  
      // Append the new file to the container
      groupFilesContainer.appendChild(fileItem);
  
    //   // Update the file count
    //   fileCounter++;
    //   fileCountElement.textContent = `${fileCounter} Files`;
  
      // Refresh Lucide icons
      lucide.createIcons();
    };
  
    // Attach event listener to the "Generate Report" button
    generateReportButton.addEventListener("click", addNewFile);
  
    // Handle file selection
    groupFilesContainer.addEventListener("change", (event) => {
      if (event.target.classList.contains("file-checkbox")) {
        const selectedFiles = document.querySelectorAll(".file-checkbox:checked").length;
        selectedFilesElement.textContent = `${selectedFiles} files selected`;
      }
    });
  });