let action = document.getElementById("action");

function setSuspend()
{
    action.value = "suspend";
}

function setBan()
{
    action.value = "ban";
}

document.getElementById("suspend").addEventListener("click", setSuspend);

document.getElementById("ban").addEventListener("click", setBan);