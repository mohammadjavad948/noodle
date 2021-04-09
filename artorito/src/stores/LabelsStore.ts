import create, {State} from "zustand";

export interface Labels{
    _id: string
    name: string
    color: string
    time: {
        _id: string
        time: number
    }[]
}

interface LabelsStore extends State {
    labels: Labels[]
    setLabels: (labels: any) => void
    setLabel: (id: string, label: any) => void
    newLabel: (label: any) => void
    removeLabel: (id: string) => void
}

export const useLabelsStore = create<LabelsStore>(set => ({
    labels: [],
    setLabels: (labels: any) => {
        // update all labels
        set({
            labels
        })
    },
    setLabel: (id: string, label: any) => {
        set((state) => {
            // update label by its id
            const index = state.labels.findIndex(e => e._id === id);
            const newState = state.labels;

            newState[index] = label;

            return {
                labels: newState
            }
        })
    },
    newLabel: (label: any) => {
        set((state) => {
            // push new label to labels array
            const newState = state.labels;

            newState.push(label);

            return {
                labels: newState
            }
        })
    },
    removeLabel: (id: string) => {
        set((state) => {
            // remove label by its id
            const index = state.labels.findIndex(e => e._id === id);
            const newState = state.labels;

            newState.splice(index, 1);

            return {
                labels: newState
            }
        })
    }
}))
