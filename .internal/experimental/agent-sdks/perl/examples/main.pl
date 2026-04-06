#!/usr/bin/env perl
use strict;
use warnings;
use HTTP::Tiny;
use JSON::PP;

my $base_url = $ENV{AGENT_URL} // "http://localhost:3000/api/v1";
my $http     = HTTP::Tiny->new;

my $resp = $http->post("$base_url/run", {
    headers => { "Content-Type" => "application/json" },
    content => encode_json({ prompt => "What are the top 3 stories on Hacker News right now?" }),
});

die "server error $resp->{status}: $resp->{content}\n" unless $resp->{success};

my $result = decode_json($resp->{content});

print $result->{text}, "\n";

my $steps  = $result->{steps}  // [];
my $usage  = $result->{usage}  // {};
printf "\nSteps:  %d\n", scalar @$steps;
printf "Tokens: %s\n", $usage->{totalTokens} // "n/a";
