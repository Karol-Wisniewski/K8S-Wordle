#!/bin/bash
kubectl create configmap keycloak-postgresql-init-script --from-file=init-script.sql
