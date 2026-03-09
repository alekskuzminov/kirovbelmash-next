// Utility to safely trigger Yandex Metrika goals
export const METRIKA_ID = 105767551;

export const sendMetrikaGoal = (goal: string, params?: any) => {
    if (typeof window !== "undefined") {
        if (!(window as any).ym) {
            (window as any).ym = function () {
                ((window as any).ym.a = (window as any).ym.a || []).push(arguments);
            };
        }
        (window as any).ym(METRIKA_ID, "reachGoal", goal, params);
        console.log(`[Metrika] reachGoal: ${goal}`);
    }
};
