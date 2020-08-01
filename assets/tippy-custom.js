$("strong").each(function () {
  const text = $(this).text();
  if (text.includes("[")) {
    const tooltipContent = text.split("[").pop().split("]")[0];
    tippy(this, {
      content: tooltipContent,
      theme: "default",
    });
    $(this).text(text.substring(0, text.indexOf("[")));
    $(this).css("cursor", "pointer");
  }
});
