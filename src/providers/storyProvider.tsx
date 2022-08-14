import { ScenarioList } from "../models/scenario/ScenarioList"
import { createSignal, createContext, useContext, ParentProps, Component, Signal } from "solid-js"
import { createStore, Store } from "solid-js/store"
import { ScenarioModel } from "../models/scenario/ScenarioModel"

export type StoryProviderType = ParentProps & {
  story?: ScenarioList
}
const StoryContext = createContext({ story: {} })

const models: ScenarioModel[] = []

const StoryProvider: Component<StoryProviderType> = (props: StoryProviderType) => {
    // const [count, setCount] = createSignal(props.story || 0),
    const [ story, setStory ]: Signal<ScenarioList> = createSignal({ scenarioList: models })
    const store = [
        story,
        {
            increment() {
                setStory({ scenarioList: models });
                console.log('inc')
            },
            decrement() {
                setStory({ scenarioList: models });
            }
        }
    ]

  return (
    <StoryContext.Provider value={store}>
      {props.children}
    </StoryContext.Provider>
  )
}

export const useStory = () => {
  return useContext(StoryContext)
}

export default StoryProvider