export const METRIKA_ID = 105767551;

const fireGoal = (goal: string, params?: Record<string, unknown>) => {
    try {
        window.ym?.(METRIKA_ID, "reachGoal", goal, params);
    } catch (e) {
        console.error("[Metrika] reachGoal error:", e);
    }
};

export const sendMetrikaGoal = (goal: string, params?: Record<string, unknown>) => {
    if (typeof window === "undefined") return;

    // Counter already initialized (yaCounterXXX object exists after triggerEvent fires)
    const counterKey = `yaCounter${METRIKA_ID}` as const;
    if ((window as unknown as Record<string, unknown>)[counterKey]) {
        fireGoal(goal, params);
        return;
    }

    // Wait for initialization event (triggerEvent: true in init config)
    const onInit = () => fireGoal(goal, params);
    document.addEventListener(`yacounter${METRIKA_ID}inited`, onInit, { once: true });
};
