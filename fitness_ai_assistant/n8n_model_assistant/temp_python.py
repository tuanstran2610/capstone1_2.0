from huggingface_hub import snapshot_download

snapshot_download(
    repo_id="intfloat/multilingual-e5-large",
    local_dir="./models/e5-large",
    local_dir_use_symlinks=False
)
