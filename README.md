# fancy counter

![image](https://github.com/user-attachments/assets/d115a155-de38-416c-81f3-b3a40f522ed6)


> 팬시카운터는 바닐라 자바스크립트, 리액트로 만든 간단한 앱이다. 마우스를 클릭해서 카운터의 숫자를 증가시키거나 감소시킬 수 있다. 키보드 스페이바를 이용해서 컨트롤도 가능하다.

**설치**

1. `npm create vite@4.4.1 .`
2. React, Javascript 선택

15

- **package.json에서 preview?**
  - 프리뷰는 빌드된 버전의 프로젝트를 로컬에서 확인할 수 있다. 프로덕션으로 최적화된 프로젝트를 다시 체크한다.
- **vite는 public**에서 사용하지 않는 스태틱 파일을 assets 폴더에서 사용하는 것을 권장한다. 최적화가 가능하다고 하는데, 유저들을 헷갈리니 public만 주로 사용한다.

19

- **radix ui**
  - npm install @radix-ui/react-icons
  - 괜찮은 ICON UI 찾아볼 수 있다.
  - radix는 이미 제작된 컴포넌트가 모여있는 라이브러리

21

- **이벤트 핸들러**
  - 이벤트 핸들러를 다룰때, 흔히들 많이 하는 실수는 setCount() 함수를 다른 함수로 감싸지 않은채 setCount()를 이용한다. 이렇게 코드를 작성하면 컴포넌트가 마운트되자마자 setCount()를 실행한다. setCount((prev)⇒prev+1)는 prev를 1 증가시키고 setCount()실행하라는 뜻이다.
  ```jsx
        <button
          onClick={
            setCount((prev) => prev + 1);
          }
          className="count-btn"
        >
          <PlusIcon className="count-btn-icon" />
        </button>
  ```

25

- **Ternary vs Logical And**
  - 삼항연산자나 앤드연산자는 리액트에서 조건에 맞는 컴포넌트를 보여줄 때 주로 사용하는 문법이다.
  - 아래와 같은 구조는 삼항보다는 앤드연산자를 쓰는 것이 더 정확하다. 삼항연산자는 type이 plus가 아닌 것은 전부 MinusIcon으로 보여주라는 뜻이다. 하지만 type이 blabla일 경우에도 MinuIcon를 보여주니 문제가 될 수 있다. 더 정확한 표현은 앤드연산자를 사용해야 한다.
    ```jsx
    // Ternary Operator
    {
      type === "plus" ? (
        <PlusIcon className="count-btn-icon" />
      ) : (
        <MinusIcon className="count-btn-icon" />
      );
    }

    // Logical And Operator
    {
      type === "plus" && <PlusIcon className="count-btn-icon" />;
    }
    {
      type === "minus" && <MinusIcon className="count-btn-icon" />;
    }
    ```

28

- **useState 남용하지 않기**
  - 주니어 개발자는 locked를 구현할 때 아마 useState를 이용할 것이다. 하지만 페이지를 리렌더링하는 변수는 count가 트래킹하고 있으니, count를 이용해서 locked를 구현하는 것이 리소스 절약차원에서 훨씬 좋다. 굳이 모든 변수를 useState로 구현하지 않아도 된다.
  - count가 변경이 될때마다 Card가 리렌더링이 되니 locked의 true, false 역시 확인하게 된다.
  ```jsx
  import { useState } from "react";
  import Count from "./Count";
  import ButtonContainer from "./ButtonContainer";
  import ResetButton from "./ResetButton";
  import Title from "./Title";

  export default function Card() {
    const [count, setCount] = useState(0);
    const locked = count === 5 ? true : false;

    return (
      <div className={`card ${locked ? "card--limit" : ""}`}>
        <Title />
        <Count count={count} />
        <ResetButton setCount={setCount} />
        <ButtonContainer setCount={setCount} locked={locked} />
      </div>
    );
  }
  ```

29

- **키보드 이벤트를 이용할 때**
  - 리액트 이외의 이벤트를 이용할 때는 useEffect로 컴포넌트가 처음 마운트될 때 이벤트리스너를 달아줘야 한다. 그리고 디펜던시 어레이에 이용을 하는 변수를 넣어 그 변수가 변경이 될 때마다 useEffect를 다시 호출할 수 있도록 해야 한다.
  - 이렇게 되면 매번 이벤트리스너가 증가하기 때문에 앱 속도가 느려진다. 클린업 함수로 이벤트리스너를 삭제해줘야 한다. 이벤트리스너는 키가 눌리고 클린업 함수에 의해 삭제될 것이다. 컴포넌트가 언마운트될 때도 리스너는 사라질 것이다.
  ```jsx
  import { useEffect, useState } from "react";
  import Count from "./Count";
  import ButtonContainer from "./ButtonContainer";
  import ResetButton from "./ResetButton";
  import Title from "./Title";

  export default function Card() {
    const [count, setCount] = useState(0);
    const locked = count === 5 ? true : false;

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.code === "Space") {
          setCount(count + 1);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [count]);

    return (
      <div className={`card ${locked ? "card--limit" : ""}`}>
        <Title locked={locked} />
        <Count count={count} />
        <ResetButton setCount={setCount} />
        <ButtonContainer setCount={setCount} locked={locked} />
      </div>
    );
  }
  ```
- **버튼 포커스 버그**
  - 스페이스바를 누르면 버튼이 포커스가 된다. 이 상태에서 스페이스바를 다시 클릭하면 count는 하나 이상으로 증가된다. 포커스가 되지 않도록 수정을 해야 한다. `e.currentTarget.blur()`
  ```jsx
  const handleClick = (e) => {
    setCount((prev) => {
      if (type === "plus") {
        const newCount = prev + 1;
        if (newCount > 5) {
          return 5;
        }
        return newCount;
      } else if (type === "minus") {
        const newCount = prev - 1;
        if (newCount < 0) {
          return 0;
        }
        return newCount;
      } else {
        console.log("something went wrong");
        return prev;
      }
    });
    e.currentTarget.blur();
  };
  ```

30

- **칠드런 패턴**
  - 프롭스드릴링을 피하기 위해 주로 ContextAPI를 이용하지만, 칠드런 패턴을 이용하는 것도 좋은 선택이다. 칠드런 패턴은 ButtonContainer처럼 setCount와 locked를 CountButton에서 연결만 해주는 역할일 때 사용하면 유용하다.
  - Card에서 CountButton에게 바로 프롭스를 전달할 수 있어 이점이 있다.
  ```jsx
  // Card.jsx
  return (
    <div className={`card ${locked ? "card--limit" : ""}`}>
      <Title locked={locked} />
      <Count count={count} />
      <ResetButton setCount={setCount} />
      <ButtonContainer>
        <CountButton type="minus" setCount={setCount} locked={locked} />
        <CountButton type="plus" setCount={setCount} locked={locked} />
      </ButtonContainer>
    </div>
  );

  // ButtonContainer.jsx
  export default function ButtonContainer({ children }) {
    return <div className="button-container">{children}</div>;
  }
  ```
