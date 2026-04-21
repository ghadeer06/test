const supabaseUrl = "https://mcxdjisoyqdnyieboqpy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jeGRqaXNveXFkbnlpZWJvcXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDI3NDAsImV4cCI6MjA5MDk3ODc0MH0.kIwJ1pc-GLX1lTvstLSDZ5Li1rd9vwutI4-Wz_HR6nE";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ===============================
// 2) جلب آخر 5 إشعارات من جدول tasks
// ===============================
async function loadLatestNotifications() {
    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false })
        .limit(5);

    if (error) {
        console.error("خطأ في جلب الإشعارات:", error);
        return;
    }

    const box = document.getElementById("latestNotifications");
    box.innerHTML = "";

    data.forEach(item => {
        box.innerHTML += `
            <div class="report-card">
                <h3>${item.title}</h3>
                <p>النوع: ${item.type}</p>
                <p>الحالة: ${item.status}</p>
                <span class="date">${item.due_date || ""}</span>
            </div>
        `;
    });
}

// ===============================
// 3) جلب آخر 5 فعاليات من جدول events
// ===============================
async function loadLatestEvents() {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("id", { ascending: false })
        .limit(5);

    if (error) {
        console.error("خطأ في جلب الفعاليات:", error);
        return;
    }

    const box = document.getElementById("latestTasks");
    box.innerHTML = "";

    data.forEach(event => {
        box.innerHTML += `
            <div class="report-card">
                <h3>${event.title}</h3>
                <p>${event.description || ""}</p>
                <span class="date">${event.date || ""} ${event.time || ""}</span>
            </div>
        `;
    });
}

// ===============================
// 4) تشغيل الدوال عند تحميل الصفحة
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    loadLatestNotifications();
    loadLatestEvents();
});
