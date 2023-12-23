.DEFAULT_GOAL := build

IMAGE ?= bun-test:latest

.PHONY: build
build:
	@docker buildx create --use --name=crossplat --node=crossplat && \
	docker buildx build \
		--progress plain \
		--output "type=docker,push=false" \
		--tag $(IMAGE) \
		--file build/Dockerfile \
		.

.PHONY: run
run:
	docker run -p 3000:3000 "${IMAGE}"