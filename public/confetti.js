function sayHi() {
  console.log("hi")

  document.addEventListener("keyup", function(event){
    if(event.key === "[") {
      console.log("click on " + event.target);
      console.log("innerHTML is" + event.target.innerHTML);
      console.log("value is" + event.target.value);
      if (event.target.innerHTML) {
        const originalText = event.target.innerHTML;
        const newText = originalText.replace("[", "{{first_name}}");
        setNativeInnerHtml(event.target, newText);
        //event.target.innerHTML = originalText.replace("[", "{{first_name}}");
      } else if (event.target.value) {
        const originalText = event.target.value;
        const newText = originalText.replace("[", "{{first_name}}");
        //event.target.setAttribute("value", newText);
        //event.target.value = newText
        setNativeValue(event.target, newText);
      } else {
        console.log("unsupported element!")
      }
    } else {
      console.log("key press detected");
    }
  }, true );
}

function setNativeInnerHtml(element, value) {
    let lastValue = element.innerHTML;
    element.innerHTML = value;
    let event = new Event("div", { target: element, bubbles: true });
    // React 15
    event.simulated = true;
    // React 16
    let tracker = element._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
}

function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    // React 15
    event.simulated = true;
    // React 16
    let tracker = element._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
}

sayHi();
