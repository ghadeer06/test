// ===============================
// 1) تهيئة Supabase
// ===============================
const supabaseUrl = "YOUR_URL";
const supabaseKey = "YOUR_ANON_KEY";
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
