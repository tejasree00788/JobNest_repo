
const jobs = [
    {
        title: "Frontend Developer",
        company: "Google",
        location: "Hyderabad",
        salary: "5-8 LPA",
        category: "IT"
    },
    {
        title: "UI/UX Designer",
        company: "Adobe",
        location: "Bangalore",
        salary: "4-7 LPA",
        category: "Design"
    },
    {
        title: "Data Analyst",
        company: "Amazon",
        location: "Hyderabad",
        salary: "6-9 LPA",
        category: "IT"
    },
    {
        title: "Digital Marketing",
        company: "Deloitte",
        location: "Mumbai",
        salary: "3-6 LPA",
        category: "Marketing"
    },
    {
        title: "Financial Analyst",
        company: "TCS",
        location: "Chennai",
        salary: "4-6 LPA",
        category: "Finance"
    }
];

let savedJobs = [];

function displayJobs(list) {
    const jobList = document.getElementById("jobList");
    jobList.innerHTML = "";

    if (list.length === 0) {
        jobList.innerHTML = "<p>No jobs found!</p>";
        return;
    }

    list.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card";

        card.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company}</p>
            <p>📍 ${job.location}</p>
            <p>💰 ${job.salary}</p>
            <div class="job-actions">
                <button class="save">♡ Save</button>
                <button class="apply">Apply Now</button>
            </div>
        `;

        card.querySelector(".save").onclick = () => saveJob(job);

        card.querySelector(".apply").onclick = () => {
            alert("You selected " + job.title);
        };

        jobList.appendChild(card);
    });
}

function searchJobs() {
    const keyword = document.getElementById("keyword")
        .value.toLowerCase();

    const location = document.getElementById("location")
        .value.toLowerCase();

    const result = jobs.filter(job =>
        (job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.category.toLowerCase().includes(keyword)) &&
        job.location.toLowerCase().includes(location)
    );

    displayJobs(result);
}

function filterCategory(category) {
    const result = jobs.filter(job =>
        job.category === category
    );

    displayJobs(result);

    document.getElementById("jobs").scrollIntoView();
}

function saveJob(job) {
    if (!savedJobs.some(item => item.title === job.title)) {
        savedJobs.push(job);
        displaySavedJobs();
        alert("Job saved successfully!");
    } else {
        alert("Already saved!");
    }
}

function displaySavedJobs() {
    const savedList = document.getElementById("savedList");
    savedList.innerHTML = "";

    savedJobs.forEach(job => {
        savedList.innerHTML += `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p>${job.company}</p>
                <p>${job.location}</p>
            </div>
        `;
    });
}

function showLogin() {
    alert("Login page will be added in the next step!");
}

displayJobs(jobs);
